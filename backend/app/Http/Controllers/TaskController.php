<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function createTask(Request $request)
    {
        $request->validate(['title' => 'required|string|max:255']);


        $task = Task::create([
            'title' => $request->title,
            'description' => $request->description,
            'status' => $request->status,
            'user_id' => auth()->id(),
        ]);

        return response()->json($task, 201);
    }

    public function getTasks()
    {
        return response()->json(Task::all());
    }

    public function getTask(Request $request, $id)
    {
        $task = Task::findOrFail($id);

        if($task->user_id === auth()->id()) {
            $task->load('users');
        }

        return response()->json($task);
    }


    public function updateTask(Request $request, $id)
    {
        $task = Task::findOrFail($id);
        $request->validate([
            'title' => 'string|max:255', 
            'status' => 'in:pending,completed,cancelled',
            'description' => 'string|max:500',
        
        ]);
        $task->update($request->only([
            'title',
            'status',
            'description',
        ]));

        return response()->json($task);
    }

    // Delete a Task
    public function deleteTask($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();

        return response()->json(['message' => 'Task deleted successfully']);
    }

    public function shareTask(Request $request, Task $task)
    {
        $request->validate([
            'username' => 'required|exists:users,username',
            'permission' => 'required|in:view,edit',
        ]);

        $user = User::where('username', $request->username)->first();

        $task->users()->syncWithoutDetaching([
            $user->id => ['permission' => $request->permission],
        ]);

        return response()->json(['message' => 'Task shared successfully']);
    }

    public function sharedTasks()
    {
        $tasks = auth()->user()->tasks()->get();

        return response()->json($tasks);
    }
}
