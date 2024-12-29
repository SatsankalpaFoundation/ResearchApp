"use client"


import { useState } from "react"
import { useEffect } from "react"
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
} from "@/components/ui/alert-dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import * as React from "react"
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
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { updateUser } from "./updateUser"

import { Label } from "@radix-ui/react-dropdown-menu"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { deleteUser } from "./deleteUser"
import createUser from "./createUser"

export const columns = [
  {
    id: "select",
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
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("role")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original
      const [value, setValue] = useState(user.role)
      return (
        <>
        <AlertDialog>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete {user.name}'s account
        and remove their data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter asChild>
    <form method='post' onSubmit={(e) => {deleteUser(user._id);}}>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction asChild><Button disabled={user.role === 'Admin' || user.role === 'SuperAdmin'} variant='destructive' type='submit'>Delete</Button></AlertDialogAction>
    </form>
    </AlertDialogFooter>
  </AlertDialogContent>
          <Dialog>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to {user.name}'s' profile here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
                          <form method='post' className="grid gap-4 py-4" onSubmit={(e) => {
                            //  e.preventDefault()
                            const formData = new FormData(e.target)
                            updateUser(user._id, formData.get('name'), formData.get('email'), formData.get('role'))
                            return true
                          }}>
                            <div className="grid grid-cols-4 items-center gap-4">                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                   disabled={user.role === 'Admin' || user.role === 'SuperAdmin'}
                    id="name"
                    name="name"
                    defaultValue={user.name}
                    required
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                     disabled={user.role === 'Admin' || user.role === 'SuperAdmin'}
                    id="email"
                    name="email"
                    defaultValue={user.email}
                    className="col-span-3"
                    required

                  />
                </div>
                <div className="hidden">
                  <Label htmlFor="email" className="text-right">
                    id
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    defaultValue={user._id}
                    className="col-span-3"
                    required

                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Role
                  </Label>
                  <Select name='role' value={value} onValueChange={setValue} disabled={user.role === 'Admin' || user.role === 'SuperAdmin'}                    required
                  >
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder={user.role} />
  </SelectTrigger>
  {}
  <SelectContent>
    <SelectItem value="Editor" >Editor</SelectItem>
    <SelectItem value="Contributor">Contributor</SelectItem>
</SelectContent>
</Select>
                </div>
              <DialogFooter>
                <Button  disabled={user.role === 'Admin' || user.role === 'SuperAdmin'} type="submit">Save changes</Button>
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
                  Copy user ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <DialogTrigger className="w-full" >Edit Profile</DialogTrigger>
                </DropdownMenuItem>
                              {user.role !== 'Admin' && user.role !== 'SuperAdmin' && (
                                <AlertDialogTrigger className="w-full">
                                  <DropdownMenuItem className="text-red-700">
                                    Delete
                                  </DropdownMenuItem>
                                </AlertDialogTrigger>
                              )}              </DropdownMenuContent>
            </DropdownMenu>
          </Dialog>
          </AlertDialog>
        </>
      )
    },
  },
]

export function DataTableDemo(info) {
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})
  const data = info.info

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
  })

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center py-4">
        <Input
          placeholder="Filter users..."
          value={table.getColumn("name")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
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
                  onCheckedChange={(value) =>
                    column.toggleVisibility(!!value)
                  }
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
                <DialogDescription>
                  Create a user
                </DialogDescription>
              </DialogHeader>
                          <form method='post' className="grid gap-4 py-4" onSubmit={(e) => {
                            //  e.preventDefault()
                            const formData = new FormData(e.target)
                            createUser(formData.get('name'), formData.get('email'), formData.get('role'))
                            return true
                          }}>
                            <div className="grid grid-cols-4 items-center gap-4">                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    className="col-span-3"
                    required
                  />
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
                  <Select name='role' required>
  <SelectTrigger className="w-[180px]">
    <SelectValue  />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="Editor" >Editor</SelectItem>
    <SelectItem value="Contributor">Contributor</SelectItem>
</SelectContent>
</Select>
                </div>
              <DialogFooter>
                <Button >Create User</Button>
              </DialogFooter>
              </form>
            </DialogContent>
            <DialogTrigger asChild><Button className='md:ml-8'>Add User</Button></DialogTrigger>

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
  )
}

export default DataTableDemo;