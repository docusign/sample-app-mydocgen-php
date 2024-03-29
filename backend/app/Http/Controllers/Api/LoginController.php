<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\BaseController;
use App\Http\Requests\Api\LoginRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class LoginController extends BaseController
{
    /**
     * Login action
     *
     * @param LoginRequest $request
     * @return JsonResponse
     */
    public function __invoke(LoginRequest $request): JsonResponse
    {
        $user  = app(User::class)->getByEmail($request->get('login'));
        $token = $user->createToken('Manager Token');

        return response()->json(['token' => $token->accessToken]);
    }
}
