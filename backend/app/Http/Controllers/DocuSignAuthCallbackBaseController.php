<?php

namespace App\Http\Controllers;

/**
 * Class DocuSignAuthCallbackController
 *
 * @package App\Http\Controllers
 */
class DocuSignAuthCallbackBaseController extends BaseController
{
    /**
     * @return void
     */
    public function __invoke()
    {
        echo 'Access accepted';
    }
}