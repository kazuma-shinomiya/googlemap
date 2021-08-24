<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::all();
        // dd($posts);
        return view('index', [
            'posts' => $posts,
        ]);
    }
    
    public function store(Post $post, Request $request)
    {
        $post->fill($request->all())->save();
        return redirect('/');
    }
    
    public function destroy($id)
    {
        $post = Post::where('id', $id)->first();
        $post->delete();
        return redirect('/');
    }
}
