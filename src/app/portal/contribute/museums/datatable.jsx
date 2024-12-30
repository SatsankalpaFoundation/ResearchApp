"use client";

import { useState } from "react";
import { useEffect } from "react";
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
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import editMuseum from "./editMuseum";
function urlformat(url){
  if (!url){
    return "/placeholdbig.svg"
  }
  const array = String(url).split(",");
  if (!array){
    return `https://drive.usercontent.google.com/download?id=${url.slice(33)}`

  }
  return `https://drive.google.com/uc?export=download&id=${array[0].slice(33)}`
  
}
export const columns = [
  {
    id: "select",
    accessorKey: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "_id",
    accessorKey: "_id",
    header: () => "_id",
    cell: ({ row }) => <div>{row.getValue("_id")}</div>,
    enableHiding: true,
  },
  {
    id: "Id",
    accessorKey: "Id",
    header: () => "Id",
    cell: ({ row }) => <div>{row.getValue("Id")}</div>,
  },
  {
    id: "Date Contributed",
    accessorKey: "Date Contributed",
    header: () => "Date Contributed",
    cell: ({ row }) => <div>{row.getValue("Date Contributed")}</div>,
  },
  {
    id: "Contributer Email Adress",
    accessorKey: "Contributer Email Adress",
    header: () => "Contributer Email Adress",
    cell: ({ row }) => <div>{row.getValue("Contributer Email Adress")}</div>,
  },
  {
    id: "Type of source",
    accessorKey: "Type of source",
    header: () => "Type of source",
    cell: ({ row }) => <div>{row.getValue("Type of source")}</div>,
  },
  {
    id: "Name of the Museum",
    accessorKey: "Name of the Museum",
    header: () => "Name of the Museum",
    cell: ({ row }) => <div>{row.getValue("Name of the Museum")}</div>,
  },
  {
    id: "Type of Museum",
    accessorKey: "Type of Museum",
    header: () => "Type of Museum",
    cell: ({ row }) => <div>{row.getValue("Type of Museum")}</div>,
  },
  {
    id: "Address of the Museum",
    accessorKey: "Address of the Museum",
    header: () => "Address of the Museum",
    cell: ({ row }) => <div>{row.getValue("Address of the Museum")}</div>,
  },
  {
    id: "Contact Person Name",
    accessorKey: "Contact Person Name",
    header: () => "Contact Person Name",
    cell: ({ row }) => <div>{row.getValue("Contact Person Name")}</div>,
  },
  {
    id: "Artefact Title",
    accessorKey: "Artefact Title",
    header: () => "Artefact Title",
    cell: ({ row }) => <div>{row.getValue("Artefact Title")}</div>,
  },
  {
    id: "Artefact Description",
    accessorKey: "Artefact Description",
    header: () => "Artefact Description",
    cell: ({ row }) => <div>{row.getValue("Artefact Description")}</div>,
  },
  {
    id: "Date",
    accessorKey: "Date",
    header: () => "Date",
    cell: ({ row }) => <div>{row.getValue("Date")}</div>,
  },
  {
    id: "Sources",
    accessorKey: "Sources",
    header: () => "Sources",
    cell: ({ row }) => <div>{row.getValue("Sources")}</div>,
  },
  {
    id: "Medium",
    accessorKey: "Medium",
    header: () => "Medium",
    cell: ({ row }) => <div>{row.getValue("Medium")}</div>,
  },
  {
    id: "Keywords used",
    accessorKey: "Keywords used",
    header: () => "Keywords used",
    cell: ({ row }) => <div>{row.getValue("Keywords used")}</div>,
  },
  {
    id: "Dimensions",
    accessorKey: "Dimensions",
    header: () => "Dimensions",
    cell: ({ row }) => <div>{row.getValue("Dimensions")}</div>,
  },
  {
    id: "Credit Line",
    accessorKey: "Credit Line",
    header: () => "Credit Line",
    cell: ({ row }) => <div>{row.getValue("Credit Line")}</div>,
  },
  {
    id: "Public Domain Designation (PDD)",
    accessorKey: "Public Domain Designation (PDD)",
    header: () => "Public Domain Designation (PDD)",
    cell: ({ row }) => (
      <div>{row.getValue("Public Domain Designation (PDD)")}</div>
    ),
  },
  {
    id: "URL",
    accessorKey: "URL",
    header: () => "URL",
    cell: ({ row }) => (
      <a href={row.getValue("URL")} target="_blank" rel="noopener noreferrer">
        {row.getValue("URL")}
      </a>
    ),
  },
  {
    id: "Provenance (Ownership History)",
    accessorKey: "Provenance (Ownership History)",
    header: () => "Provenance (Ownership History)",
    cell: ({ row }) => (
      <div>{row.getValue("Provenance (Ownership History)")}</div>
    ),
  },
  {
    id: "Multimedia",
    accessorKey: "Multimedia",
    header: () => "Multimedia",
    cell: ({ row }) => <Image src={urlformat(row.getValue("Multimedia"))} alt="Book Cover" width={200} height={400} style={{ width: '100px', height: 'auto' }} />,
  },
  {
    id: "actions",
    accessorKey: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;
      const [value, setValue] = useState(user.role);
      return (
        <>
            <AlertDialog>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete{" "}
                  {user.name}'s account and remove their data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter asChild>
                <form
                  method="post"
                  onSubmit={(e) => {
                    deleteUser(user._id);
                  }}
                >
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <Button
                      disabled={
                        user.role === "Admin" || user.role === "SuperAdmin"
                      }
                      variant="destructive"
                      type="submit"
                    >
                      Delete
                    </Button>
                  </AlertDialogAction>
                </form>
              </AlertDialogFooter>
            </AlertDialogContent>
            <Dialog>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to {user["Artefact Title"]} here. Click save when
                    you're done.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.target)
                  editMuseum(
                    user._id,
                    formData.get("typeOfSource"),
                    formData.get("museumName"),
                    formData.get("museumType"),
                    formData.get("museumAddress"),
                    formData.get("contactPerson"),
                    formData.get("artefactTitle"),
                    formData.get("artefactDescription"),
                    formData.get("date"),
                    formData.get("sources"),
                    formData.get("medium"),
                    formData.get("keywords"),
                    formData.get("dimensions"),
                    formData.get("creditLine"),
                    formData.get("pdd"),
                    formData.get("url"),
                    formData.get("provenance"),
                    formData.get("multimedia")

                  )
                }}>
                  <ScrollArea className="h-[500px] w-full">


                    <Label className="text-right">Id</Label>
                    <Input id="id" defaultValue={user.Id} className="col-span-3" disabled/>

                    <Label className="text-right">Type of source</Label>
                    <Input id="typeOfSource" name="typeOfSource" defaultValue={user["Type of source"]} className="col-span-3" />

                    <Label className="text-right">Name of the Museum</Label>
                    <Input id="museumName" name="museumName" defaultValue={user["Name of the Museum"]} className="col-span-3" />

                    <Label className="text-right">Type of Museum</Label>
                    <Input id="museumType" name="museumType" defaultValue={user["Type of Museum"]} className="col-span-3" />

                    <Label className="text-right">Address of the Museum</Label>
                    <Input id="museumAddress" name="museumAddress" defaultValue={user["Address of the Museum"]} className="col-span-3" />

                    <Label className="text-right">Contact Person Name</Label>
                    <Input id="contactPerson" name="contactPerson" defaultValue={user["Contact Person Name"]} className="col-span-3" />

                    <Label className="text-right">Artefact Title</Label>
                    <Input id="artefactTitle" name="artefactTitle" defaultValue={user["Artefact Title"]} className="col-span-3" />

                    <Label className="text-right">Artefact Description</Label>
                    <Input id="artefactDescription" name="artefactDescription" defaultValue={user["Artefact Description"]} className="col-span-3" />

                    <Label className="text-right">Date</Label>
                    <Input id="date" name="date" defaultValue={user.Date} className="col-span-3" />

                    <Label className="text-right">Sources</Label>
                    <Input id="sources" name="sources" defaultValue={user.Sources} className="col-span-3" />

                    <Label className="text-right">Medium</Label>
                    <Input id="medium" name="medium" defaultValue={user.Medium} className="col-span-3" />

                    <Label className="text-right">Keywords used</Label>
                    <Input id="keywords" name="keywords" defaultValue={user["Keywords used"]} className="col-span-3" />

                    <Label className="text-right">Dimensions</Label>
                    <Input id="dimensions" name="dimensions" defaultValue={user.Dimensions} className="col-span-3" />

                    <Label className="text-right">Credit Line</Label>
                    <Input id="creditLine" name="creditLine" defaultValue={user["Credit Line"]} className="col-span-3" />

                    <Label className="text-right">Public Domain Designation (PDD)</Label>
                    <Input id="pdd" name="pdd" defaultValue={user["Public Domain Designation (PDD)"]} className="col-span-3" />

                    <Label className="text-right">URL</Label>
                    <Input id="url" name="url" defaultValue={user.URL} className="col-span-3" />

                    <Label className="text-right">Provenance (Ownership History)</Label>
                    <Input id="provenance" name="provenance" defaultValue={user["Provenance (Ownership History)"]} className="col-span-3" />

                    <Label className="text-right">Multimedia</Label>
                    <Input id="multimedia" name="multimedia" defaultValue={user.Multimedia} className="col-span-3" />
                </ScrollArea>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
                </form>
              </DialogContent>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => navigator.clipboard.writeText(user._id)}
                  >
                    Copy Book ID
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <DialogTrigger className="w-full">Edit</DialogTrigger>
                  </DropdownMenuItem>

                  <AlertDialogTrigger className="w-full">
                    <DropdownMenuItem className="text-red-700">
                      Delete
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>
            </Dialog>
          </AlertDialog>
        </>
      );
    },
  },
];
export function DataTableDemo(info) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const data = info.info;

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center py-4">
        <Input
          placeholder="Filter Artefacts..."
          value={table.getColumn("Artefact Title")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table
              .getColumn("Artefact Title")
              ?.setFilterValue(event.target.value)
          }
          className="w-full md:max-w-sm"
        />
        <DropdownMenu className="hidden md:display">
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="md:ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Dialog>
          <DialogContent className="">
            <DialogHeader>
              <DialogTitle>Add User</DialogTitle>
              <DialogDescription>Create a user</DialogDescription>
            </DialogHeader>
            <form
              method="post"
              className="grid gap-4 py-4"
              onSubmit={(e) => {
                //  e.preventDefault()
                const formData = new FormData(e.target);
                createUser(
                  formData.get("name"),
                  formData.get("email"),
                  formData.get("role")
                );
                return true;
              }}
            >
              <div className="grid grid-cols-4 items-center gap-4">
                {" "}
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" name="name" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  className="col-span-3"
                  required
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Role
                </Label>
                <Select name="role" required>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Editor">Editor</SelectItem>
                    <SelectItem value="Contributor">Contributor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button>Create Entry</Button>
              </DialogFooter>
            </form>
          </DialogContent>
          <DialogTrigger asChild>
            <Button className="md:ml-8">Add Entry</Button>
          </DialogTrigger>
        </Dialog>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DataTableDemo;
