using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using todoappbackend.Database;
using todoappbackend.Functionality;
using todoappbackend.Models;

namespace todoappbackend.Service
{
    public class TaskOperations : ITaskfunctionality
    {
        private readonly DatabaseContext _db;
        public TaskOperations(DatabaseContext db)
        {
            _db = db;
        }

         public async Task<IEnumerable<TodoTask>> GetUserTasksAsync(int userId)
        {
            return await _db.Tasks
                .Where(t => t.UserId == userId)
                .ToListAsync();
        }

        public async Task<TodoTask> AddTaskAsync(TodoTask task)
        {
            _db.Tasks.Add(task);
            await _db.SaveChangesAsync();
            return task;
        }

        public async Task<TodoTask> UpdateTaskAsync(TodoTask task)
        {
            var existingTask = await _db.Tasks
                .FirstOrDefaultAsync(t => t.Id == task.Id && t.UserId == task.UserId);        
            if (existingTask == null)
                return null;
            existingTask.Title = task.Title;
            existingTask.DueDate = task.DueDate;
            existingTask.Completed = task.Completed;
            existingTask.CompletedDate = task.CompletedDate;
            await _db.SaveChangesAsync();
            return existingTask; 
        }

        public async Task<bool> DeleteTaskAsync(int taskId, int userId)
        {
            var task = await _db.Tasks
                .FirstOrDefaultAsync(t => t.Id == taskId && t.UserId == userId);
                
            if (task == null)
                return false;

            _db.Tasks.Remove(task);
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAllTasksAsync(int userId)
        {
            var tasks = await _db.Tasks
                .Where(t => t.UserId == userId)
                .ToListAsync();

            _db.Tasks.RemoveRange(tasks);
            await _db.SaveChangesAsync();
            return true;
        }
    }
}