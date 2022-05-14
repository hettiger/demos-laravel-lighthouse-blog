<?php

namespace App\GraphQL\Mutations;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class LoginResolver
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $input = validator($args, [
            'email' => 'required|email',
            'password' => 'required',
            'device_name' => 'required',
        ])->validate();

        $user = User::where('email', $input['email'])->first();

        if (! $user || ! Hash::check($input['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        return ['token' => $user->createToken($input['device_name'])->plainTextToken];
    }
}
