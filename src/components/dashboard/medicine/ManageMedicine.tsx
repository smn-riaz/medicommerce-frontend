"use client";
import DeleteConfirmationModal from "@/components/shared/dashboard/MMModal";
import { MMTable } from "@/components/shared/dashboard/MMTable";
import { Button } from "@/components/ui/button";
import { deleteMedicine } from "@/services/medicine";
import { TMedicineResponse } from "@/types";

import { ColumnDef } from "@tanstack/react-table";
import { Pen, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";



const ManageMedicine = ({ data }: { data: TMedicineResponse[] }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const router = useRouter()

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleDelete = (data: TMedicineResponse) => {
    setSelectedId(data?._id);
    setSelectedItem(data?.name);
    setModalOpen(true);
  };

  const handleDeleteConfirm = async (id:string) => {
    try {
        if (id) {
          const res = await deleteMedicine(id)
     
          if (res.success) {
            toast.success(res.message);
            setModalOpen(false);
          } else {
            toast.error(res.message);
          }
        }
    } catch (err: any) {
      console.error(err?.message);
    }
  };

  const handleUpdate = (id:string)=>{
    router.push(`/admin/medicines/update-medicine/${id}`)
  }

  const columns: ColumnDef<TMedicineResponse>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "imageUrl",
      header: () => <div>Image</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Image
            src={row.original.imageUrl[0]}
            alt={row.original.name}
            width={80}
            height={80}
            className="w-8 h-8 rounded-full"
          />
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "manufacturer",
      header: "Menufacturer",
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => (
        <p className="text-center">{row.original.price}</p>
      )
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: ({ row }) => (
        <p className="text-center">{row.original.quantity}</p>
      )
    },
    {
      accessorKey: "inStock",
      header: () => <div>Stock</div>,
      cell: ({ row }) => (
        <div>
          {row.original.inStock ? (
            <p className="text-green-500 border bg-green-100 w-14 text-center px-1 rounded">
              True
            </p>
          ) : (
            <p className="text-red-500 border bg-red-100 w-14 text-center px-1 rounded">
              False
            </p>
          )}
        </div>
      ),
    },
    // {
    //   accessorKey: "discount",
    //   header: "Discount",
    //   cell: ({ row }) => (
    //     <div>
    //       <p className="text-center">{row.original.discount}%</p>
    //     </div>
    //   ),
    // },
    {
      accessorKey: "expireDate",
      header: "Expire",
    },
    {
      accessorKey: "delete",
      header: () => <div>Delete</div>,
      cell: ({ row }) => (
        <div className="flex justify-center items-center">
          <button
          className="text-red-500 cursor-pointer"
          title="Delete"
          onClick={() => handleDelete(row.original)}
        >
         <Trash className="w-5 h-5" />
        </button>
        </div>
      ),
    },
    {
      accessorKey: "requiredPrescription",
      header: () => <div>Prescription</div>,
      cell: ({ row }) => (
        <div className="text-center flex justify-center items-center">
          {row.original.requiredPrescription ? (
            <p className="text-green-500 border bg-green-100 w-14 text-center px-1 rounded">
              True
            </p>
          ) : (
            <p className="text-red-500 border bg-red-100 w-14 text-center px-1 rounded">
              False
            </p>
          )}
        </div>
      ),
    },

    {
      accessorKey: "update",
      header: () => <div>Update</div>,
      cell: ({ row }) => (
        <div className="flex justify-center items-center"><button
        className="text-blue-500 cursor-pointer"
        title="Update"
        onClick={() => handleUpdate(row.original._id)}
      >
       <Pen className="w-5 h-5" />
      </button></div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-end my-4">
        <Link href="/admin/create-medicine"><Button>Create Medicine</Button></Link>
      </div>
      <div className="flex items-center justify-between">
        <MMTable data={data} columns={columns} />
        <DeleteConfirmationModal
          name={selectedItem}
          isOpen={isModalOpen}
          onOpenChange={setModalOpen}
          onConfirm={() => selectedId && handleDeleteConfirm(selectedId)}
        />
      </div>
    </div>
  );
};

export default ManageMedicine;
