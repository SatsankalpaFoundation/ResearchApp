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

import { Textarea } from "@/components/ui/textarea"

import { Label } from "@radix-ui/react-dropdown-menu"
import Image from "next/image"
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
import { ScrollArea } from "@/components/ui/scroll-area"
import { editBook } from "./editBook"

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
      id: "select", // Assuming this is a placeholder for selection functionality
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
      id: "_id", // Directly matching the schema key
      accessorKey: "_id",
      header: () => "ID",
      cell: ({ row }) => <div>{row.getValue("_id")}</div>,
      enableHiding: true, // Consider hiding this column as it's mainly for internal use
    },
    {
      id: "Id", // Assuming this is a typo or a separate field, adjusting to match the schema
      accessorKey: "Id",
      header: () => "Book ID",
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
      header: () => "Contributor Email Address",
      cell: ({ row }) => <div>{row.getValue("Contributer Email Adress")}</div>,
    },
    {
      id: "Type of source",
      accessorKey: "Type of source",
      header: () => "Type of Source",
      cell: ({ row }) => <div>{row.getValue("Type of source")}</div>,
    },
    {
      id: "Name of the Library",
      accessorKey: "Name of the Library",
      header: () => "Name of the Library",
      cell: ({ row }) => <div>{row.getValue("Name of the Library")}</div>,
    },
    {
      id: "Type of Library",
      accessorKey: "Type of Library",
      header: () => "Type of Library",
      cell: ({ row }) => <div>{row.getValue("Type of Library")}</div>,
    },
    {
      id: "Address of the Library",
      accessorKey: "Address of the Library",
      header: () => "Address of the Library",
      cell: ({ row }) => <div>{row.getValue("Address of the Library")}</div>,
    },
    {
      id: "Book Name",
      accessorKey: "Book Name",
      header: () => "Book Name",
      cell: ({ row }) => <div>{row.getValue("Book Name")}</div>,
    },
    {
      id: "Description of Book",
      accessorKey: "Description of Book",
      header: () => "Description of Book",
      cell: ({ row }) => <div>{row.getValue("Description of Book")}</div>,
    },
    {
      id: "Author(s)",
      accessorKey: "Author(s)",
      header: () => "Author(s)",
      cell: ({ row }) => <div>{row.getValue("Author(s)")}</div>,
    },
    {
      id: "Publication",
      accessorKey: "Publication",
      header: () => "Publication",
      cell: ({ row }) => <div>{row.getValue("Publication")}</div>,
    },
    {
      id: "Year",
      accessorKey: "Year",
      header: () => "Year",
      cell: ({ row }) => <div>{row.getValue("Year")}</div>,
    },
    {
      id: "Copyright",
      accessorKey: "Copyright",
      header: () => "Copyright",
      cell: ({ row }) => <div>{row.getValue("Copyright")}</div>,
    },
    {
      id: "ISBN/ISSN Number",
      accessorKey: "ISBN/ISSN Number",
      header: () => "ISBN/ISSN Number",
      cell: ({ row }) => <div>{row.getValue("ISBN/ISSN Number")}</div>,
    },
    {
      id: "Language",
      accessorKey: "Language",
      header: () => "Language",
      cell: ({ row }) => <div>{row.getValue("Language")}</div>,
    },
    {
      id: "URL",
      accessorKey: "URL",
      header: () => "URL",
      cell: ({ row }) => <a className="text-blue-500" href={row.getValue("URL")} target="_blank" rel="noopener noreferrer">{row.getValue("URL")}</a>,
    },
    {
      id: "Keywords used",
      accessorKey: "Keywords used",
      header: () => "Keywords Used",
      cell: ({ row }) => <div>{row.getValue("Keywords used")}</div>,
    },
    {
      id: "Image of the Book",
      accessorKey: "Image of the Book",
      header: () => "Image of the Book",
      cell: ({ row }) => (
        <Image src={urlformat(row.getValue("Image of the Book"))} alt="Book Cover" width={100} height={200} style={{ width: '100px', height: 'auto' }} />
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
      <form method='post' onSubmit={(e) => {console.log(user._id);}}>
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
                    Make changes to {user["Book Name"]} here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                            <form method='post' className="grid gap-4 py-4" onSubmit={(e) => {
                              //  e.preventDefault()
                              const formData = new FormData(e.target)
                              console.log(                                                            formData.get('Description of Book')                            )
                                                          editBook(user._id, 
                                                            formData.get('Type of source'),
                                                            formData.get('Name of the Library'),
                                                            formData.get('Type of Library'),
                                                            formData.get('Address of the Library'),
                                                            formData.get('Book Name'),
                                                            formData.get('Description of Book'),
                                                            formData.get('Author(s)'),
                                                            formData.get('Publication'),
                                                            formData.get('Year'),
                                                            formData.get('Copyright'),
                                                            formData.get('ISBN/ISSN Number'),
                                                            formData.get('Language'),
                                                            formData.get('URL'),
                                                            formData.get('Keywords used'),
                                                            formData.get('Image of the Book')
                                                          )
                                                          return true                            }}>

                              <ScrollArea className="h-[500px] w-full">
                              <Label htmlFor="Id">Id</Label>
                              <Input id="Id" name="Id" defaultValue={user.Id} className="w-full" disabled />
                              <Label htmlFor="Type of source">Type of source</Label>
                              <Input id="Type of source" name="Type of source" defaultValue={user["Type of source"]} onChange={(e) => setValue({...value, "Type of source": e.target.value})} className="w-full" />
                              <Label htmlFor="Name of the Library">Name of the Library</Label>
                              <Input id="Name of the Library" name="Name of the Library" defaultValue={user["Name of the Library"]} onChange={(e) => setValue({...value, "Name of the Library": e.target.value})} className="w-full" />
                              <Label htmlFor="Type of Library">Type of Library</Label>
                              <Input id="Type of Library" name="Type of Library" defaultValue={user["Type of Library"]} onChange={(e) => setValue({...value, "Type of Library": e.target.value})} className="w-full" />
                              <Label htmlFor="Address of the Library">Address of the Library</Label>
                              <Input id="Address of the Library" name="Address of the Library" defaultValue={user["Address of the Library"]} onChange={(e) => setValue({...value, "Address of the Library": e.target.value})} className="w-full" />
                              <Label htmlFor="Book Name">Book Name</Label>
                              <Input id="Book Name" name="Book Name" defaultValue={user["Book Name"]} onChange={(e) => setValue({...value, "Book Name": e.target.value})} className="w-full" />
                              <Label htmlFor="Description of Book">Description of Book</Label>
                              <Textarea id="Description of Book" name="Description of Book" defaultValue={user["Description of Book"]} onChange={(e) => {console.log(e.target.value); setValue({...value, "Description of Book": e.target.value})}} className="w-full" rows={4} />
                              <Label htmlFor="Author(s)">Author(s)</Label>
                              <Input id="Author(s)" name="Author(s)" defaultValue={user["Author(s)"]} onChange={(e) => setValue({...value, "Author(s)": e.target.value})} className="w-full" />
                              <Label htmlFor="Publication">Publication</Label>
                              <Input id="Publication" name="Publication" defaultValue={user.Publication} onChange={(e) => setValue({...value, Publication: e.target.value})} className="w-full" />
                              <Label htmlFor="Year">Year</Label>
                              <Input id="Year" name="Year" type="number" defaultValue={user.Year} onChange={(e) => setValue({...value, Year: e.target.value})} className="w-full" />
                              <Label htmlFor="Copyright">Copyright</Label>
                              <Input id="Copyright" name="Copyright" defaultValue={user.Copyright} onChange={(e) => setValue({...value, Copyright: e.target.value})} className="w-full" />
                              <Label htmlFor="ISBN/ISSN Number">ISBN/ISSN Number</Label>
                              <Input id="ISBN/ISSN Number" name="ISBN/ISSN Number" defaultValue={user["ISBN/ISSN Number"]} onChange={(e) => setValue({...value, "ISBN/ISSN Number": e.target.value})} className="w-full" />
                              <Label htmlFor="Language">Language</Label>
                              <Input id="Language" name="Language" defaultValue={user.Language} onChange={(e) => setValue({...value, Language: e.target.value})} className="w-full" />
                              <Label htmlFor="URL">URL</Label>
                              <Input id="URL" name="URL" defaultValue={user.URL} onChange={(e) => setValue({...value, URL: e.target.value})} className="w-full" />
                              <Label htmlFor="Keywords used">Keywords used</Label>
                              <Input id="Keywords used" name="Keywords used" defaultValue={user["Keywords used"]} onChange={(e) => setValue({...value, "Keywords used": e.target.value})} className="w-full" />
                              <Label htmlFor="Image of the Book">Image of the Book</Label>
                              <Input id="Image of the Book" name="Image of the Book" defaultValue={user["Image of the Book"]} onChange={(e) => setValue({...value, "Image of the Book": e.target.value})} className="w-full" />
                              </ScrollArea>
                              <DialogFooter>                  <Button type="submit">Save</Button>
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
                    <DialogTrigger className="w-full" >Edit</DialogTrigger>
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
        )
      },
    },  ];
  

export function DataTableDemoEditor(info) {
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
          placeholder="Filter books..."
          value={table.getColumn("Book Name")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("Book Name")?.setFilterValue(event.target.value)
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
                <Button >Create Entry</Button>
              </DialogFooter>
              </form>
            </DialogContent>
            <DialogTrigger asChild><Button className='md:ml-8'>Add Entry</Button></DialogTrigger>

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

export default DataTableDemoEditor;