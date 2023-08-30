import { useEffect, useState } from 'react';
import NavBar from '../../../../../layout/navBar';
import InputSearch from '../../../../../shared/components/inputSearch';
import CustomTable from '../../../../../shared/components/table';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/customRedux';
import './styles.scss';
import { MdAddBox } from 'react-icons/md';
import { ColumnsType } from 'antd/es/table';
import { ListServiceInterface, RoomsInterface, ServiceInterface } from '../../../../../@types';
import { GoDotFill } from 'react-icons/go';
import { GetDataServices } from '../../../../../core/redux';

export default function DSDichVu(props: ListServiceInterface) {
  //colunms services
  const columns: ColumnsType<ServiceInterface> = [
    {
      key: 'serviceId',
      title: 'Mã dịch vụ',
      dataIndex: 'serviceId',
    },
    {
      key: 'serviceName',
      title: 'Tên dịch vụ',
      dataIndex: 'serviceName',
    },
    {
      key: 'price',
      title: 'Giá dịch vụ',
      render: (_, record) => <p className="mt-1 mb-1">{record.price} vnd</p>,
    },
    {
      key: 'rooms',
      title: 'Số phòng',
      render: (_, record) =>
        record.rooms.map((room, index) => {
          return (
            <p className="mt-1 mb-1" key={index}>
              - P.{room}
            </p>
          );
        }),
    },
    {
      key: 'status',
      title: 'Trạng thái sử dụng',
      render: (_, record) =>
        record.status ? (
          <span className="status-online d-flex active-green">
            <GoDotFill />
            <p>Còn sử dụng</p>
          </span>
        ) : (
          <span className="status-online d-flex active-red">
            <GoDotFill />
            <p>Không sử dụng</p>
          </span>
        ),
    },
    {
      key: 'description',
      title: '',
      render: (_, record) => (
        <p className="text-link" onClick={() => props.HandleClickDescriptionService(record.key)}>
          Chi tiết
        </p>
      ),
    },
    {
      key: 'update',
      title: '',
      render: (_, record) => (
        <p className="text-link" onClick={() => props.HandleClickUpdateService(record.key)}>
          Cập nhập
        </p>
      ),
    },
  ];
  //get data servies
  const dispatch = useAppDispatch();
  const ListServices = useAppSelector(state => state.Service.Service);
  useEffect(() => {
    dispatch(GetDataServices());
  }, [dispatch]);

  const [inputSearch, setInputSearch] = useState<string>('');
  const [newList, setNewList] = useState<ServiceInterface[]>([]);
  //filter data
  useEffect(() => {
    if (ListServices.length > 0) {
      const listSort = [...ListServices].sort((a, b) => (a.serviceId > b.serviceId ? 1 : -1));
      const newSearchText = listSort.filter(room => room.serviceId.includes(inputSearch));
      setNewList(newSearchText);
    }
  }, [inputSearch, ListServices]);

  return (
    <div className="col-10 d-flex position-relative">
      <NavBar text="Dịch Vụ" />
      <div className="content-DS-dichVu">
        <h3>Danh sách dịch vụ</h3>
        <div className="navbar-DS-dichVu d-flex ms-4">
          <div className="mt-2">
            <p>Tìm kiếm tên dịch vụ</p>
            <InputSearch
              HandleInputSearch={e => setInputSearch(e.target.value)}
              width={400}
              placeholder="Nhập tên dịch vụ"
            />
          </div>
        </div>
        <div className="list-DS-dichVu m-4 ">
          <CustomTable data={newList} columns={columns} />
        </div>
      </div>
      <div
        className="button-add-dichVu position-absolute d-flex"
        onClick={() => props.HandleClickAddService()}
      >
        <MdAddBox />
        <p> Thêm dịch vụ</p>
      </div>
    </div>
  );
}
