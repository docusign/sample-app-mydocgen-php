<?php

namespace App\Rules;

use App\Models\User;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Hash;

/**
 * Class PasswordRule
 *
 * @package App\Rules
 */
class PasswordRule implements Rule
{
    /**
     * @param string|null $login
     */
    public function __construct(protected string|null $login = null)
    {
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     * @SuppressWarnings(PHPMD.UnusedFormalParameter)
     */
    public function passes($attribute, $value)
    {
        if (!$this->login) {
            return false;
        }

        $user = app(User::class)->query()->where('email', $this->login)->first();

        if (!$user) {
            return false;
        }

        return Hash::check($value, $user->password);
    }

    /**
     * Get the validation error message.
     *
     * @return string|array
     */
    public function message()
    {
        return trans('auth.failed');
    }
}