<?php

namespace App\Http\Requests\Api;

use App\DTO\Scenario3\FormData;
use Illuminate\Foundation\Http\FormRequest;

class Scenario3Request extends FormRequest
{
    public function rules(): array
    {
        return [
            'client.first_name'          => ['required', 'max:40'],
            'client.last_name'           => ['required', 'max:40'],
            'client.email'               => ['required', 'email', 'max:100'],
            'client.phone'               => ['bail', 'required', 'string', 'phone'],
            'client.address.line_1'      => ['required', 'max:255'],
            'client.address.line_2'      => ['nullable', 'max:255'],
            'client.address.city'        => ['required', 'max:255'],
            'client.address.state'       => ['required', 'max:255'],
            'client.address.postal_code' => ['required', 'max:255'],
            'client.address.country'     => ['required', 'max:255'],

            'survey.job_status'                    => ['required'],
            'survey.worked_here_before'            => ['required'],
            'survey.applied_to_available_position' => ['required'],
            'survey.still_employed'                => ['required'],
            'survey.start_date'                    => ['nullable', 'date_format:m-d-Y'],
            'survey.last_employed_date'            => ['nullable', 'date_format:m-d-Y'],
            'survey.leaving.reason'                => ['nullable'],
            'survey.leaving.description'           => ['nullable'],
            'survey.responsibility'                => ['required'],

            'employer.company_name'        => ['required', 'max:255'],
            'employer.contact_name'        => ['required', 'max:255'],
            'employer.phone'               => ['bail', 'required', 'string', 'phone'],
            'employer.address.line_1'      => ['required', 'max:255'],
            'employer.address.line_2'      => ['nullable', 'max:255'],
            'employer.address.city'        => ['required', 'max:255'],
            'employer.address.state'       => ['required', 'max:255'],
            'employer.address.postal_code' => ['required', 'max:255'],
            'employer.address.country'     => ['required', 'max:255'],

            'work_address.matches'     => ['required', 'bool'],
            'work_address.line_1'      => ['required_if:work_address.matches,false', 'max:255'],
            'work_address.line_2'      => ['nullable', 'max:255'],
            'work_address.city'        => ['required_if:work_address.matches,false', 'max:255'],
            'work_address.state'       => ['required_if:work_address.matches,false', 'max:255'],
            'work_address.postal_code' => ['required_if:work_address.matches,false', 'max:255'],
            'work_address.country'     => ['required_if:work_address.matches,false', 'max:255'],

            'appeal.description'   => ['required'],
            'appeal.how_to_solve'  => ['required'],
        ];
    }

    public function toDto(): FormData
    {
        return new FormData($this->validated());
    }
}
