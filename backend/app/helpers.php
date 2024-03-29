<?php

if (! function_exists('sanitize')) {
    function sanitize(string|null $text): null|string {
        if (is_null($text)) {
            return null;
        }

        return trim(json_encode(trim($text)), '"');
    }
}
