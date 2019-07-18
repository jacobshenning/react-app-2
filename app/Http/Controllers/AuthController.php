<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;

class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     *
     */
    public function user()
    {
        return Auth::user()->toJson();
    }

    /**
     *
     */
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        $user = User::where('email', $credentials['email'])->first();

        if (Hash::check($credentials['password'], $user->password)) {
            return $user->api_token;
        }

        return response()->json([
          'message' => 'Invalid credentials',
          'errors' => [
            'password' => ['Invalid password']
            ]
          ], 401);
    }

    /**
     *
     */
    public function register(RegisterRequest $request)
    {
        $credentials = $request->validated();

        return User::create([
            'name' => $credentials['name'],
            'email' => $credentials['email'],
            'password' => Hash::make($credentials['password']),
            'api_token' => Str::random(60),
        ])->api_token;
    }
}
