<?php

namespace App\Policies;

use App\User;
use App\Task;
use App\Project;
use Illuminate\Auth\Access\HandlesAuthorization;

class TaskPolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the given post can be updated by the user.
     *
     * @param  \App\User  $user
     * @param  \App\Task  $project
     * @return bool
     */
    public function update(User $user, Task $project)
    {
        return $user->id === request()->route('task')->project->user_id;
    }
}
