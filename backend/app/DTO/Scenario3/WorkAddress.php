<?php

namespace App\DTO\Scenario3;

use App\DTO\Address;

class WorkAddress
{
    public readonly bool $matches;
    public readonly ?Address $address;

    public function __construct(array $params)
    {
        $this->matches = $params['matches'];
        $this->address = $this->matches
            ? null
            : new Address(
                $params['country'],
                $params['state'],
                $params['city'],
                $params['postal_code'],
                $params['line_1'],
                $params['line_2'] ?? null
            );
    }
}
