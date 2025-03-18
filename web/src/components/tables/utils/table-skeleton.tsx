/**
 * v0 by Vercel.
 * @see https://v0.dev/t/gxuq0ezFtsp
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export default function TableSkelton({ rows = 5 }: { rows?: number }) {
  return (
    <Table>
      <TableBody>
        {Array(rows)
          .fill(null)
          .map((_, index) => (
            <TableRow key={index} className="border-none">
              <TableCell>
                <Skeleton className="h-7  " />
              </TableCell>
              <TableCell>
                <Skeleton className="h-7  " />
              </TableCell>
              <TableCell>
                <Skeleton className="h-7  " />
              </TableCell>
              <TableCell className="">
                <Skeleton className="h-7 " />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
