import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useCreateWallpaper from "../hooks/useCreateWallpaper";
import useGetWallpapers from "../hooks/useGetWallpapers";
import useEditWallpaper from "../hooks/useEditWallpaper";
import useDeleteWallpaper from "../hooks/useDeleteWallpaper";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import { toast, Flip } from "react-toastify";
import { FaExchangeAlt } from "react-icons/fa";

function WallpaperManagementPage() {
  const [editingWallpaper, setEditingWallpaper] = useState(null); // State to track which wallpaper is being edited
  const { register, handleSubmit, formState, reset, watch } = useForm();
  const { errors, isSubmitting } = formState;
  const { isCreating, createNewWallpaper } = useCreateWallpaper();
  const { isEditing, updateWallpaper } = useEditWallpaper();
  const { isDeleting, removeWallpaper } = useDeleteWallpaper();
  const { data: wallpapers, isLoading: isLoadingWallpapers } =
    useGetWallpapers();
  const [imagePreview, setImagePreview] = useState(null);

  const onSubmit = async (data) => {
    if (editingWallpaper) {
      // Editing existing wallpaper
      updateWallpaper(editingWallpaper.id, data, {
        onSuccess: () => {
          toast.success("Wallpaper updated successfully!", {
            position: "top-center",
            autoClose: 600,
            theme: "dark",
            transition: Flip,
          });
          resetForm();
        },
        onError: () => {
          toast.error("Failed to update wallpaper.", {
            position: "top-center",
            autoClose: 5000,
            theme: "dark",
            transition: Flip,
          });
        },
      });
    } else {
      // Creating new wallpaper
      createNewWallpaper(data, {
        onSuccess: () => {
          toast.success("Wallpaper created successfully!", {
            position: "top-center",
            autoClose: 600,
            theme: "dark",
            transition: Flip,
          });
          resetForm();
        },
        onError: () => {
          toast.error("Failed to create wallpaper.", {
            position: "top-center",
            autoClose: 5000,
            theme: "dark",
            transition: Flip,
          });
        },
      });
    }
  };

  const handleEdit = (wallpaper) => {
    setEditingWallpaper(wallpaper); // Set the wallpaper to edit
    reset(wallpaper); // Load wallpaper data into the form
    setImagePreview(wallpaper.image); // Set image preview
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this wallpaper?")) {
      removeWallpaper(id, {
        onSuccess: () => {
          toast.success("Wallpaper deleted successfully!", {
            position: "top-center",
            autoClose: 600,
            theme: "dark",
            transition: Flip,
          });
        },
        onError: () => {
          toast.error("Failed to delete wallpaper.", {
            position: "top-center",
            autoClose: 5000,
            theme: "dark",
            transition: Flip,
          });
        },
      });
    }
  };

  const resetForm = () => {
    reset(); // Reset form fields
    setEditingWallpaper(null); // Stop editing mode
    setImagePreview(null); // Reset image preview
  };

  const watchImage = watch("image");

  React.useEffect(() => {
    if (watchImage && watchImage.length > 0) {
      const file = watchImage[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }, [watchImage]);

  if (isCreating || isEditing || isDeleting || isLoadingWallpapers) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto my-10">
      <h2 className="mb-6 text-3xl font-bold text-center">Manage Wallpapers</h2>

      {/* Form for creating or editing wallpaper */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-lg p-6 mx-auto mb-10 bg-white rounded-lg shadow-md"
      >
        <h3 className="mb-4 text-xl font-semibold text-center">
          {editingWallpaper ? "Edit Wallpaper" : "Create New Wallpaper"}
        </h3>

        <div className="space-y-4">
          <div>
            <label
              className="block mb-1 font-semibold text-gray-600"
              htmlFor="product_name"
            >
              Wallpaper Name
            </label>
            <input
              className={`w-full px-4 py-2 border ${
                errors.product_name ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none`}
              type="text"
              id="product_name"
              {...register("product_name", {
                required: "Wallpaper name is required",
              })}
            />
            {errors.product_name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.product_name.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="block mb-1 font-semibold text-gray-600"
              htmlFor="product_link"
            >
              Wallpaper Link
            </label>
            <input
              className={`w-full px-4 py-2 border ${
                errors.product_link ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none`}
              type="url"
              id="product_link"
              {...register("product_link", {
                required: "Wallpaper link is required",
              })}
            />
            {errors.product_link && (
              <p className="mt-1 text-sm text-red-500">
                {errors.product_link.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="block mb-1 font-semibold text-gray-600"
              htmlFor="image"
            >
              Wallpaper Image
            </label>
            <input
              className={`w-full px-4 py-2 border ${
                errors.image ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none`}
              type="file"
              id="image"
              {...register("image", {
                required: !editingWallpaper && "Image is required",
              })}
            />
            {errors.image && (
              <p className="mt-1 text-sm text-red-500">
                {errors.image.message}
              </p>
            )}
            {imagePreview && (
              <div className="flex items-center justify-center mt-4 ">
                <img
                  src={imagePreview}
                  alt="Wallpaper Preview"
                  className="w-24 h-24 border rounded-md"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Button type="submit" className="w-full py-2 mt-6">
            {isSubmitting
              ? editingWallpaper
                ? "Updating..."
                : "Creating..."
              : editingWallpaper
              ? "Update Wallpaper"
              : "Create Wallpaper"}
          </Button>

          {editingWallpaper && (
            <Button onClick={resetForm} className="py-2 mt-6 ">
              <FaExchangeAlt />
            </Button>
          )}
        </div>
      </form>

      {/* Display wallpapers list */}
      <div className="max-w-3xl mx-auto space-y-6">
        <h3 className="text-xl font-semibold text-center">Wallpaper List</h3>
        {wallpapers && wallpapers.length > 0 ? (
          wallpapers.map((wallpaper) => (
            <div
              key={wallpaper.id}
              className="p-4 bg-white rounded-lg shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={wallpaper.product_image}
                    alt={wallpaper.product_name}
                    className="w-16 h-16 border rounded-md"
                  />
                  <div>
                    <h4 className="text-lg font-semibold">
                      {wallpaper.product_name}
                    </h4>
                    <a
                      href={wallpaper.product_image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-500"
                    >
                      View Wallpaper
                    </a>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    className="bg-yellow-500 hover:bg-yellow-600"
                    onClick={() => handleEdit(wallpaper)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="bg-red-500 hover:bg-red-600"
                    onClick={() => handleDelete(wallpaper.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No wallpapers found.</p>
        )}
      </div>
    </div>
  );
}

export default WallpaperManagementPage;
