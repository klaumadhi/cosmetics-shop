import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useCreateWallpaper from "../../hooks/useCreateWallpaper";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import { toast, Flip } from "react-toastify";

function CreateWallpaperForm() {
  const [imagePreview, setImagePreview] = useState(null);
  const { register, handleSubmit, formState, reset, watch } = useForm();
  const { errors, isSubmitting } = formState;
  const { isCreating, createNewWallpaper } = useCreateWallpaper();

  const onSubmit = async (data) => {
    try {
      createNewWallpaper(data, {
        onSuccess: () => {
          toast.success("Wallpaper created successfully!", {
            position: "top-center",
            autoClose: 600,
            theme: "dark",
            transition: Flip,
          });
          reset();
          setImagePreview(null);
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
    } catch (error) {
      console.error("Error creating wallpaper:", error);
    }
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

  if (isCreating) {
    return <Spinner />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg p-6 mx-auto bg-white rounded-lg shadow-md"
    >
      <h2 className="mb-6 text-2xl font-semibold text-center text-gray-700">
        Create New Wallpaper
      </h2>

      <div className="space-y-4">
        <div>
          <label
            className="block mb-1 font-semibold text-gray-600"
            htmlFor="product_name"
          >
            Wallpaper Name
          </label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
            type="text"
            id="product_name"
            {...register("product_name", {
              required: "Wallpaper name is required",
            })}
          />
          {errors.product_name && (
            <p className="text-sm text-red-500">
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
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
            type="url"
            id="product_link"
            {...register("product_link", {
              required: "Wallpaper link is required",
            })}
          />
          {errors.product_link && (
            <p className="text-sm text-red-500">
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
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
            type="file"
            id="image"
            {...register("image", { required: "Image is required" })}
          />
          {errors.image && (
            <p className="text-sm text-red-500">{errors.image.message}</p>
          )}
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Wallpaper Preview"
                className="w-full h-32 border rounded-md"
              />
            </div>
          )}
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 mt-6 text-white bg-purple-600 rounded-md"
      >
        {isSubmitting ? "Creating..." : "Create Wallpaper"}
      </Button>
    </form>
  );
}

export default CreateWallpaperForm;
