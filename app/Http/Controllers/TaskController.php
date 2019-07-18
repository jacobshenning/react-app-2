<?php

namespace App\Http\Controllers;

use App\Http\Requests\Task\MarkAsCompletedRequest;
use App\Http\Requests\Task\CreateRequest;
use Illuminate\Http\Request;
use App\Project;
use App\Task;

class TaskController extends Controller
{
  public function __construct()
  {
      $this->middleware('auth:api');
  }

  public function create(CreateRequest $request, Project $project)
  {
    $data = $request->validated();

    return Task::create([
      'title' => $data['title'],
      'project_id' => $project->id,
    ])->toJson();
  }

  public function markAsCompleted(MarkAsCompletedRequest $request, Project $project, Task $task)
  {
    $request->validated();

    $task->is_completed = true;
    $task->update();

    return $task->toJson();
  }
}
