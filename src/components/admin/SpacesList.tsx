
import { useState } from "react";
import { Space } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Pencil, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface SpacesListProps {
  spaces: Space[];
  onEdit: (space: Space) => void;
}

export const SpacesList = ({ spaces, onEdit }: SpacesListProps) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteSpace = async (id: string) => {
    setIsDeleting(true);
    try {
      const { error } = await supabase.from("spaces").delete().eq("id", id);
      
      if (error) {
        throw error;
      }
      
      toast.success("Space deleted successfully");
      setDeletingId(null);
      // Ideally, we'd refetch the data here or update the state
      // This example depends on the query invalidation from useSpaces to refresh the list
    } catch (error) {
      console.error("Error deleting space:", error);
      toast.error("Failed to delete space");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {spaces.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          No spaces found. Click on "Add New Space" to create one.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Price (Daily)</TableHead>
                <TableHead>Available Seats</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {spaces.map((space) => (
                <TableRow key={space.id}>
                  <TableCell className="font-medium">{space.name}</TableCell>
                  <TableCell>
                    {space.location.area}, {space.location.city}
                  </TableCell>
                  <TableCell>₹{space.price.daily}</TableCell>
                  <TableCell>{space.availableSeats}</TableCell>
                  <TableCell>{space.featured ? "Yes" : "No"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onEdit(space)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => setDeletingId(space.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete
                              the space "{space.name}" and remove its data from the server.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-600 hover:bg-red-700"
                              onClick={() => handleDeleteSpace(space.id)}
                              disabled={isDeleting}
                            >
                              {isDeleting && deletingId === space.id
                                ? "Deleting..."
                                : "Delete"}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
