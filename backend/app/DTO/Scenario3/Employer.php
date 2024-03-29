<?php

namespace App\DTO\Scenario3;

use App\DTO\Address;
use Propaganistas\LaravelPhone\PhoneNumber;

class Employer
{
    public readonly string $companyName;
    public readonly string $contactName;
    public readonly PhoneNumber $phoneNumber;
    public readonly Address $address;

    public function __construct(array $params)
    {
        $this->companyName = $params['company_name'];
        $this->contactName = $params['contact_name'];
        $this->phoneNumber = new PhoneNumber($params['phone']);
        $this->address     = new Address(
            $params['address']['country'],
            $params['address']['state'],
            $params['address']['city'],
            $params['address']['postal_code'],
            $params['address']['line_1'],
            $params['address']['line_2'] ?? null,
        );
    }
}
