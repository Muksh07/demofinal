using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using todoappbackend.Models;

namespace todoappbackend.Functionality
{
    public interface ITaskfunctionality
    {
        Task<IEnumerable<TodoTask>> GetUserTasksAsync(int userId);
        Task<TodoTask> AddTaskAsync(TodoTask task);
        Task<TodoTask> UpdateTaskAsync(TodoTask task);
        Task<bool> DeleteTaskAsync(int taskId, int userId);
        Task<bool> DeleteAllTasksAsync(int userId);
    }
}