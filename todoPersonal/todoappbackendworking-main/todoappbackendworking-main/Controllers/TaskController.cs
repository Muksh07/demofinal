using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using todoappbackend.Functionality;
using todoappbackend.Models;

namespace todoappbackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly ITaskfunctionality _taskfunctionality;

        public TaskController(ITaskfunctionality taskfunctionality)
        {
            _taskfunctionality = taskfunctionality;
        }

        // GET: api/task/{userId}
        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<TodoTask>>> GetTasks(int userId)
        {
            var tasks = await _taskfunctionality.GetUserTasksAsync(userId);
            return Ok(tasks);
        }

        // POST: api/task
        [HttpPost]
        public async Task<ActionResult<TodoTask>> AddTask([FromBody] TodoTask task)
        {
            if (task.UserId <= 0)
            {
                return BadRequest("User ID is required");
            }

            var addedTask = await _taskfunctionality.AddTaskAsync(task);
            return CreatedAtAction(nameof(GetTasks), new { userId = task.UserId }, addedTask);
        }

        // PUT: api/task/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, [FromBody] TodoTask task)
        {
            if (id != task.Id)
            {
                return BadRequest("Task ID mismatch");
            }

            var updatedTask = await _taskfunctionality.UpdateTaskAsync(task);
            if (updatedTask == null)
            {
                return NotFound();
            }

            return Ok(updatedTask);
        }

        // DELETE: api/task/{userId}/{id}
        [HttpDelete("{userId}/{id}")]
        public async Task<IActionResult> DeleteTask(int userId, int id)
        {
            var result = await _taskfunctionality.DeleteTaskAsync(id, userId);
            if (!result)
            {
                return NotFound();
            }

            return Ok();
        }

        // DELETE: api/task/{userId}
        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteAllTasks(int userId)
        {
            await _taskfunctionality.DeleteAllTasksAsync(userId);
            return Ok();
        }
    }
}