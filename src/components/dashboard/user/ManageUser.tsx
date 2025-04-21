"use client";
import DeleteConfirmationModal from "@/components/shared/dashboard/MMModal";
import { MMTable } from "@/components/shared/dashboard/MMTable";
import { Button } from "@/components/ui/button";
import { deleteSingleUser } from "@/services/user";
import {  IUserResponse } from "@/types";

import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";



const ManageUser = ({ data }: { data: IUserResponse[] }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleDelete = (data: IUserResponse) => {
    setSelectedId(data?._id);
    setSelectedItem(data?.name);
    setModalOpen(true);
  };

  const handleDeleteConfirm = async (id:string) => {
    try {
        if (id) {
          const res = await deleteSingleUser(id);
          
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

  const columns: ColumnDef<IUserResponse>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
   
    {
      accessorKey: "email",
      header: "Email",
    },

    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <div>
          {row.original.role === "user" ? (
            <p className="text-green-500 border bg-green-100 w-14 text-center font-semibold px-1 rounded">
              {row.original.role}
            </p>
          ) : (
            <p className="text-blue-500 border bg-red-100 w-14 text-center font-semibold px-1 rounded">
                {row.original.role} 
            </p>
          )}
        </div>
      ),
    },
    
    {
      accessorKey: "order",
      header: () => <div>Orders</div>,
      cell: ({ row }) => (
        <Link href="/">
        <Button className="rounded-full bg-primary text-white cursor-pointer w-[30px] h-[30px]">{5}</Button></Link>
      ),
    },
    {
      accessorKey: "action",
      header: () => <div>Action</div>,
      cell: ({ row }) => (
        <>
        { row.original.role === "user" &&
          <button
          className="text-red-500 cursor-pointer"
          title="Delete"
          onClick={() => handleDelete(row.original)}
        >
          <Trash className="w-5 h-5" />
        </button>
        }
        </>
      ),
    },
    
  ];

  return (
    <div>
      
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

export default ManageUser;
