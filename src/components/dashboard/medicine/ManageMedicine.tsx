"use client";
import DeleteConfirmationModal from "@/components/shared/dashboard/MMModal";
import { MMTable } from "@/components/shared/dashboard/MMTable";
import { Button } from "@/components/ui/button";
import { TMedicine } from "@/types";

import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";



const ManageMedicine = ({ data }: { data: TMedicine[] }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleDelete = (data: TMedicine) => {
    setSelectedId(data?._id);
    setSelectedItem(data?.name);
    setModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      //   if (selectedId) {
      //     const res = await deleteCategory(selectedId);
      //     console.log(res);
      //     if (res.success) {
      //       toast.success(res.message);
      //       setModalOpen(false);
      //     } else {
      //       toast.error(res.message);
      //     }
      //   }
    } catch (err: any) {
      console.error(err?.message);
    }
  };

  const columns: ColumnDef<TMedicine>[] = [
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
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
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
    {
      accessorKey: "discount",
      header: "Discount",
      cell: ({ row }) => (
        <div>
          <p>{row.original.discount}%</p>
        </div>
      ),
    },
    {
      accessorKey: "expireDate",
      header: "Expire",
    },
    {
      accessorKey: "action",
      header: () => <div>Action</div>,
      cell: ({ row }) => (
        <button
          className="text-red-500"
          title="Delete"
          onClick={() => handleDelete(row.original)}
        >
          <Trash className="w-5 h-5" />
        </button>
      ),
    },
    {
      accessorKey: "requiredPrescription",
      header: () => <div>Prescription</div>,
      cell: ({ row }) => (
        <div>
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
  ];

  return (
    <div>
      <div className="flex items-center justify-end my-4">
        <Button>Create Medicine</Button>
      </div>
      <div className="flex items-center justify-between">
        <MMTable data={data} columns={columns} />
        <DeleteConfirmationModal
          name={selectedItem}
          isOpen={isModalOpen}
          onOpenChange={setModalOpen}
          onConfirm={handleDeleteConfirm}
        />
      </div>
    </div>
  );
};

export default ManageMedicine;
