
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface FormActionsProps {
  isLoading: boolean;
  isUploading: boolean;
  onCancel: () => void;
  isEditing: boolean;
}

export const FormActions = ({ isLoading, isUploading, onCancel, isEditing }: FormActionsProps) => {
  return (
    <div className="flex justify-end space-x-4">
      <Button variant="outline" onClick={onCancel} disabled={isLoading || isUploading}>
        Cancel
      </Button>
      <Button 
        type="submit" 
        disabled={isLoading || isUploading}
        className="bg-blue-600 hover:bg-blue-700"
      >
        {(isLoading || isUploading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isEditing ? "Update Space" : "Create Space"}
      </Button>
    </div>
  );
};
