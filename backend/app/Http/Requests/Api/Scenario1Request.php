<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class Scenario1Request extends FormRequest
{
    public function rules(): array
    {
        return [
            'customer.first_name' => ['required', 'max:40'],
            'customer.last_name'  => ['required', 'max:40'],
            'customer.email'      => ['required', 'email', 'max:100'],

            'address.line_1'      => ['required', 'max:255'],
            'address.line_2'      => ['nullable', 'max:255'],
            'address.city'        => ['required', 'max:255'],
            'address.state'       => ['required', 'max:255'],
            'address.country'     => ['required', 'max:255'],
            'address.postal_code' => ['required', 'max:255'],

            'loan.amount'               => ['required', 'numeric'],
            'loan.rate'                 => ['required', 'numeric', 'max:100'],
            'loan.monthly_payment'      => ['required', 'numeric'],
            'loan.due_date'             => ['required', 'date_format:m-d-Y'],
            'loan.monthly_payment_day'  => ['required', 'numeric', 'min:1', 'max:31'],
            'loan.penalty_amount'       => ['required', 'numeric'],

            'lender.first_name' => ['required', 'max:40'],
            'lender.last_name'  => ['required', 'max:40'],
            'lender.email'      => ['required', 'email', 'max:100'],
        ];
    }
}
