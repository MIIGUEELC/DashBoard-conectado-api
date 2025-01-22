import Swal from "sweetalert2";

const deleteAlert = () => {
  return new Promise((resolve) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(226, 52, 40)",
      cancelButtonColor: "#135846",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          confirmButtonColor: "#135846",
        });
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

export default deleteAlert;
