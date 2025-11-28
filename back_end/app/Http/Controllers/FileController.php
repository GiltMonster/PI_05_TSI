<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{

    static function getListAnexos()
    {
        $files = Storage::files('uploads');

        $filesNameOnly = array_map(function ($filePath) {
            return basename($filePath);
        }, $files);

        return response()->json(
            $filesNameOnly,
            200
        );
    }

    static function getAnexoByPrescricaoId($id)
    {
        $files = Storage::files('uploads');

        $filteredFiles = array_filter($files, function ($filePath) use ($id) {
            $fileName = basename($filePath);
            return str_starts_with($fileName, $id . '_');
        });

        $filesNameOnly = array_map(function ($filePath) {
            return basename($filePath);
        }, $filteredFiles);

        if (empty($filesNameOnly)) {
            return response()->json([
                'message' => 'Nenhum arquivo encontrado para o pet ID especificado.',
            ], 404);
        }

        return response()->json(
            $filesNameOnly,
            200
        );
    }

    function getAnexosByPetId($petId)
    {
        $files = Storage::files('uploads');

        $filteredFiles = array_filter($files, function ($filePath) use ($petId) {
            $fileName = basename($filePath);
            return str_starts_with($fileName, $petId . '_');
        });

        $filesNameOnly = array_map(function ($filePath) {
            return basename($filePath);
        }, $filteredFiles);

        if (empty($filesNameOnly)) {
            return response()->json([
                'message' => 'Nenhum arquivo encontrado para o pet ID especificado.',
            ], 404);
        }

        return response()->json(
            $filesNameOnly,
            200
        );
    }


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
            'file' => 'required|file|max:20240', // Max size 20MB
            'pet_id' => 'required|integer|exists:pets,id',
        ]);

        if ($request->file('file') && $request->file('file')->isValid()) {
            $originalName = $request->file('file')->getClientOriginalName();
            $petId = $request->input('pet_id');
            $prescricaoId = $request->input('prescricao_id');

            // Nome final: <PETID>_<PRESCRICAOID>_<NOMEORIGINAL>
            $finalName = $petId . '_' . $prescricaoId . '_' . $originalName;

            $path = $request->file('file')->storeAs('uploads', $finalName);

            return response()->json([
                'message' => 'Arquivo enviado com sucesso!',
                'path' => $path,
                'filename' => $finalName,
                'pet_id' => $petId,
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
