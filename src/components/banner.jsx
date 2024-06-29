"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";

import PropTypes from 'prop-types';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Banner({ breadcrumb, title = "Home" }) {
  // Ensure breadcrumbs is an array; if not, initialize it as an empty array
  const breadcrumbs = Array.isArray(breadcrumb)? [...breadcrumb] : [];
  
  // Only attempt to shift and pop if breadcrumbs has elements
  const first = breadcrumbs.length > 0? breadcrumbs.shift() : null;
  const last = breadcrumbs.length > 0? breadcrumbs.pop() : null;

  return (
    <>
      <div className="bg-[url('/banner.png')] bg-cover bg-center h-[100px] lg:h-40 w-[96%] m-auto rounded-[15px] mt-5">
        <h1 className=" overflow-x-auto md:overflow-x-hidden md:hover:overflow-x-auto whitespace-nowrap text-[48px] lg:text-[72px] w-[80%] font-bold mx-[31px] lg:mx-[62px]">
          {String(title)}
        </h1>
        <Breadcrumb className="mx-[31px] lg:mx-[62px]">
          <BreadcrumbList>
            {first && (
              <BreadcrumbItem>
                <BreadcrumbLink>{first}</BreadcrumbLink>
              </BreadcrumbItem>
            )}
            {last && <BreadcrumbSeparator />}

            {breadcrumbs.length > 0 && (
              <>
                <BreadcrumbItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1">
                      <BreadcrumbEllipsis className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {breadcrumbs.map((item) => (
                        <DropdownMenuItem key={item}>
                          <BreadcrumbLink>{item}</BreadcrumbLink>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}
            {last && (
              <BreadcrumbItem>
                <BreadcrumbPage>{last}</BreadcrumbPage>
              </BreadcrumbItem>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </>
  );
}

Banner.propTypes = {
  breadcrumb: PropTypes.arrayOf(PropTypes.string),
};

export default Banner;
