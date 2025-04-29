
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/layout/Navbar";
import { useSpaces } from "@/hooks/useSpaces";
import { Space } from "@/types";
import { SpacesList } from "@/components/admin/SpacesList";
import { SpaceForm } from "@/components/admin/SpaceForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { PlusCircle } from "lucide-react";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("list");
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
  const { data: spaces, isLoading, error } = useSpaces();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };

  const handleEditSpace = (space: Space) => {
    setSelectedSpace(space);
    setActiveTab("edit");
  };

  const handleAddNewSpace = () => {
    setSelectedSpace(null);
    setActiveTab("add");
  };

  const handleBack = () => {
    setActiveTab("list");
    setSelectedSpace(null);
  };

  if (error) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto py-8">
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4">
            Error loading spaces: {error instanceof Error ? error.message : "Unknown error"}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome, {user?.email}</p>
          </div>
          <div>
            <Button variant="outline" onClick={handleLogout} className="ml-2">
              Logout
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="list">Spaces List</TabsTrigger>
            <TabsTrigger value="add" disabled={activeTab === "edit"}>Add New Space</TabsTrigger>
            {activeTab === "edit" && <TabsTrigger value="edit">Edit Space</TabsTrigger>}
          </TabsList>

          <TabsContent value="list">
            <div className="flex justify-end mb-4">
              <Button onClick={handleAddNewSpace}>
                <PlusCircle className="mr-2 h-5 w-5" /> Add New Space
              </Button>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg p-4 shadow">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/4 mb-4" />
                    <div className="flex space-x-2">
                      <Skeleton className="h-9 w-16" />
                      <Skeleton className="h-9 w-16" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <SpacesList spaces={spaces || []} onEdit={handleEditSpace} />
            )}
          </TabsContent>

          <TabsContent value="add">
            <div className="bg-white rounded-lg p-6 shadow">
              <h2 className="text-xl font-semibold mb-4">Add New Space</h2>
              <SpaceForm onCancel={handleBack} />
            </div>
          </TabsContent>

          <TabsContent value="edit">
            <div className="bg-white rounded-lg p-6 shadow">
              <h2 className="text-xl font-semibold mb-4">Edit Space</h2>
              {selectedSpace && <SpaceForm initialData={selectedSpace} onCancel={handleBack} />}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default AdminDashboard;
