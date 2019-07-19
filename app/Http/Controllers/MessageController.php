<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\Message\CreateRequest;
use Illuminate\Support\Facades\Auth;
use App\Message;

class MessageController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function create(CreateRequest $request)
    {
        $data = $request->validated();

        return Message::create([
            'message' => $data['message'],
            'user_id' => Auth::user()->id
        ])->toJson();
    }

    public function all()
    {
        return
          Message::orderBy('created_at', 'asc')
          ->with('user:id,name')
          ->get()
          ->toJson();
    }
}
