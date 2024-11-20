README for APIs

API Documentation

Authentication APIs

## Register User

- Endpoint: POST api/register
- Description: Registers a new user in the system.
- Request Body:

{
    "name": "John Doe",
    "email": "<johndoe@example.com>",
    "password": "securepassword",
    "password_confirmation": "securepassword"
}

Response:

- Success (201): User registered successfully.
- Error (422): Validation errors.

## Login User

- Endpoint: POST api/login
- Description: Logs in an existing user and returns a token.
- Request Body:

{
    "email": "<johndoe@example.com>",
    "password": "securepassword"
}

- Response:
- Success (200):

{
    "token": "access-token",
    "user": {
        "id": 1,
        "name": "John Doe",
        "email": "<johndoe@example.com>"
    }
}

 - Error (401): Invalid credentials.

## Logout User

- Endpoint: POST api/logout
- Description: Logs out the authenticated user.
- Headers:
- Authorization: Bearer <token>
- Response:
- Success (200): Logged out successfully.

## Task Management APIs

Create Task

- Endpoint: POST api/create-task
- Description: Creates a new task.
- Headers:
- Authorization: Bearer <token>
- Request Body:

{
    "title": "Sample Task",
    "description": "This is a task description",
    "status": "pending"
}

- Response:
- Success (201):

{
    "id": 1,
    "title": "Sample Task",
    "description": "This is a task description",
    "status": "pending",
    "created_at": "2024-11-20T10:00:00Z"
}

- Error (422): Validation errors.

Get All Tasks

- Endpoint: GET api/tasks
- Description: Retrieves all tasks for the authenticated user.
- Headers:
- Authorization: Bearer <token>
- Response:
- Success (200):

[
    {
        "id": 1,
        "title": "Sample Task",
        "description": "This is a task description",
        "status": "pending",
        "created_at": "2024-11-20T10:00:00Z"
    }
]

Get Task Details

- Endpoint: GET api/task/{id}
- Description: Retrieves details of a specific task by its ID.
- Headers:
- Authorization: Bearer <token>
- Response:
- Success (200):

{
    "id": 1,
    "title": "Sample Task",
    "description": "This is a task description",
    "status": "pending",
    "created_at": "2024-11-20T10:00:00Z"
}

- Error (404): Task not found.

Update Task

- Endpoint: PUT api/update-task/{id}
- Description: Updates an existing task by its ID.
- Headers:
- Authorization: Bearer <token>
- Request Body:

{
    "title": "Updated Task Title",
    "description": "Updated task description",
    "status": "completed"
}

- Response:
- Success (200): Task updated successfully.
- Error (404): Task not found.

## Delete Task

- Endpoint: DELETE api/delete-task/{id}
- Description: Deletes a task by its ID.
- Headers:
- Authorization: Bearer <token>
- Response:
- Success (200): Task deleted successfully.
- Error (404): Task not found.

## Share Task

- Endpoint: POST api/tasks/{task}/share
- Description: Shares a task with another user.
- Headers:
- Authorization: Bearer <token>
- Request Body:

{
    "email": "<recipient@example.com>"
}

- Response:
- Success (200): Task shared successfully.
- Error (404): Task or user not found.

## Get Shared Tasks

- Endpoint: GET api/tasks/shared
- Description: Retrieves tasks shared with the authenticated user.
- Headers:
- Authorization: Bearer <token>
- Response:
- Success (200):

[
    {
        "id": 2,
        "title": "Shared Task",
        "description": "Task shared by another user",
        "status": "in-progress",
        "shared_by": "anotheruser@example.com"
    }
]

Error Responses

- 401 Unauthorized: Invalid or missing token.
- 403 Forbidden: User not authorized to perform this action.
- 404 Not Found: Resource does not exist.
- 422 Unprocessable Entity: Validation errors.

## Notes

- Ensure all API requests requiring authentication include the header:

Authorization: Bearer <token>

- Replace {id} and {task} with the actual IDs in the endpoints.
