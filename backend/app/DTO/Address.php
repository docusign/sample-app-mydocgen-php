<?php

namespace App\DTO;

class Address
{
    public function __construct(
        private readonly string $country,
        private readonly string $state,
        private readonly string $city,
        private readonly string $postalCode,
        private readonly string $line1,
        private readonly ?string $line2,

    ) {}

    public function toString(string $delimiter = ', '): string
    {
        $orderedParts = [
            $this->postalCode,
            $this->line1,
            $this->line2,
            $this->city,
            $this->state,
            $this->country
        ];

        return implode($delimiter, array_filter($orderedParts));
    }
}
