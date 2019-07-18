<?php

namespace App\Http\Controllers;

use App\Http\Requests\Project\CreateRequest;
use App\Http\Requests\Project\MarkAsCompletedRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Project;

class ProjectController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function all()
    {
      return request()
        ->user()
        ->projects()
        ->where('is_completed', false)
        ->orderBy('created_at', 'desc')
        ->withCount(['tasks' => function ($query) {
          $query->where('is_completed', false);
        }])
        ->get()
        ->toJson();
    }

    public function store(CreateRequest $request)
    {
      $data = $request->validated();

      return Project::create([
        'name' => $data['name'],
        'description' => $data['description'],
        'user_id' => Auth::user()->id
      ])->toJson();
    }

    public function show($id)
    {
      return Auth::user()
        ->projects()
        ->with(['tasks' => function ($query) {
          $query->where('is_completed', false);
        }])
        ->find($id)
        ->toJson();
    }

    public function markAsCompleted(MarkAsCompletedRequest $request, Project $project)
    {
      $request->validated();

      $project->is_completed = true;
      $project->update();

      return $project->toJson();
    }
}
