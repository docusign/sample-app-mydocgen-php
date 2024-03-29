<?php

namespace App\Http\Requests\Api;

use App\Rules\PasswordRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * Class LoginRequest
 *
 * @package App\Http\Requests\Api
 */
class LoginRequest extends FormRequest
{
    /**
     * Validation messages
     *
     * @return array
     */
    public function messages()
    {
        return [
            'login.exists' => trans('auth.failed'),
        ];
    }

    /**
     * Rules of request
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'login' => [
                'required',
                Rule::exists('users', 'email'),
            ],
            'password' => [
                'required',
                new PasswordRule($this->get('login')),
            ],
        ];
    }
}