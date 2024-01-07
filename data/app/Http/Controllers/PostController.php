<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\CreatePostRequest;
use App\Repositories\PostRepositorie;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Session;



class PostController extends Controller
{
    protected $PostRepositorie;

    public function __construct(PostRepositorie $PostRepositorie)
    {
        $this->PostRepositorie = $PostRepositorie;
    }

    public function postData()
    {
        $posts = $this->PostRepositorie->paginate(3);

        return response()->json(['posts' => $posts]);
    }



    public function create(){
        return view('post.create');
    }

    public function store(CreatePostRequest $request)
    {
        $data = $request->validated();
        $postStore = $this->PostRepositorie->create($data);
    }

    public function edit($id){
        $post = $this->PostRepositorie->find($id);
        return response()->json(['post' => $post]);
    }

    public function update(CreatePostRequest $request, $id)
    {
        $data = $request->validated();
        $this->PostRepositorie->update($id, $data);
    }

    public function delete($id)
    {
        $this->PostRepositorie->delete($id);
    }
    
    

}
