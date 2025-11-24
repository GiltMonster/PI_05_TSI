<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;


class FileController extends Controller
{

    function downloadFile($filename)
    {
        $filePath = 'uploads/' . $filename;

        if (Storage::exists($filePath)) {
            return Storage::download($filePath);
        } else {
            return response()->json([
                'message' => 'Arquivo não encontrado.',
            ], 404);
        }

    }

    function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file|max:10240', // Max size 10MB
        ]);

        if ($request->file('file')->isValid()) {

            $path = $request->file('file')->store('uploads');

            return response()->json([
                'message' => 'Arquivo enviado com sucesso!',
                'path' => $path,
            ], 200);

        } else {
            return response()->json([
                'message' => 'Falha ao enviar o arquivo.',
            ], 400);
        }
    }

    function deleteFile(Request $request, $filename)
    {
        $filePath = 'uploads/' . $filename;

        if (Storage::exists($filePath)) {
            Storage::delete($filePath);

            return response()->json([
                'message' => 'Arquivo deletado com sucesso!',
            ], 200);
        } else {
            return response()->json([
                'message' => 'Arquivo não encontrado.',
            ], 404);
        }
    }

}
