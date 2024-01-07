<?php

namespace App\Repositories;

use App\Repositories\BaseRepositorie;
use App\Models\Post;

class PostRepositorie extends BaseRepositorie
{
    public function __construct(Post $post){
        parent::__construct($post);
    }
}