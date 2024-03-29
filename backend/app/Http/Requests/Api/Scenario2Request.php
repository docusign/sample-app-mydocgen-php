<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class Scenario2Request extends FormRequest
{
    public function rules(): array
    {
        return [
            'applicants.*.full_name'  => ['required', 'string', 'max:100'],
            'applicants.*.email'      => ['required', 'email', 'max:100'],
            'applicants.*.position'   => ['required', 'max:255'],
            'applicants.*.start_date' => ['required', 'date_format:m-d-Y'],
            'applicants.*.salary'     => ['required', 'string'],

            'manager.full_name' => ['required', 'string', 'max:100'],
            'manager.email'     => ['required', 'email', 'max:100'],
        ];
    }
}
