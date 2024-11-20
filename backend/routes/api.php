<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/create-task', [TaskController::class, 'createTask']);
    Route::get('/task/{id}', [TaskController::class, 'getTask']);
    Route::get('/tasks', [TaskController::class, 'getTasks']);
    Route::put('/update-task/{id}', [TaskController::class, 'updateTask']);
    Route::delete('/delete-task/{id}', [TaskController::class, 'deleteTask']);

    Route::post('/tasks/{task}/share', [TaskController::class, 'shareTask']);
    Route::get('/tasks/shared', [TaskController::class, 'sharedTasks']);
});
