
import { useState } from "react";
import { FormLabel } from "@/components/ui/form";
import { Upload } from "lucide-react";

interface ImageUploadProps {
  uploadedImages: string[];
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageFiles: File[];
}

export const ImageUpload = ({
  uploadedImages,
  onImageChange,
  imageFiles,
}: ImageUploadProps) => {
  return (
    <div className="col-span-full space-y-2">
      <FormLabel>Images</FormLabel>
      <div className="border border-dashed rounded-md p-6 bg-gray-50">
        <div className="flex flex-col items-center justify-center space-y-2">
          <Upload className="h-8 w-8 text-gray-400" />
          <div className="text-sm text-center text-gray-500">
            <label htmlFor="image-upload" className="cursor-pointer text-blue-600 hover:underline">
              Click to upload
            </label>
            <input
              id="image-upload"
              type="file"
              multiple
              accept="image/*"
              onChange={onImageChange}
              className="hidden"
            />
            <p className="mt-1">or drag and drop image files</p>
          </div>
        </div>
      </div>
      {/* Preview selected files */}
      {(imageFiles.length > 0 || uploadedImages.length > 0) && (
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Images:</h4>
          <div className="grid grid-cols-3 gap-2">
            {uploadedImages.map((url, index) => (
              <div key={`uploaded-${index}`} className="relative h-24 rounded-md overflow-hidden">
                <img 
                  src={url} 
                  alt={`Uploaded ${index}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
            {imageFiles.map((file, index) => (
              <div key={`file-${index}`} className="relative h-24 rounded-md overflow-hidden">
                <img 
                  src={URL.createObjectURL(file)} 
                  alt={`Selected ${index}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
