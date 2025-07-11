import { useSearchParams } from "react-router-dom";
import { useCabins } from "./useCabins";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { isLoading, cabins } = useCabins();

  const [searchParams] = useSearchParams();

  //filter
  const filterBy = searchParams.get("discount") || "all";
  let filteredCabinsData;
  if (filterBy === "all") filteredCabinsData = cabins;
  if (filterBy === "no-discount")
    filteredCabinsData = cabins?.filter((item) => item.discount === 0);
  if (filterBy === "with-discount")
    filteredCabinsData = cabins?.filter((item) => item.discount > 0);

  //sort
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabinsData?.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  if (!cabins.length) return <Empty resourceName="cabins" />;

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
