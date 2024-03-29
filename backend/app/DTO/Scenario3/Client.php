<?php

namespace App\DTO\Scenario3;

use App\DTO\Address;
use Propaganistas\LaravelPhone\PhoneNumber;

class Client
{
    public readonly string $firstName;
    public readonly string $lastName;
    public readonly string $email;
    public readonly PhoneNumber $phoneNumber;
    public readonly Address $address;

    public function __construct(array $params)
    {
        $this->firstName   = $params['first_name'];
        $this->lastName    = $params['last_name'];
        $this->email       = $params['email'];
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

    public function getFullName(): string
    {
        return "$this->firstName $this->lastName";
    }
}
