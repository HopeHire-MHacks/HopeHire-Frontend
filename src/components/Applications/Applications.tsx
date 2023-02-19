import ApplicationService, { ApplicationData } from '@/api/Applications/ApplicationService';
import { routes } from '@/constants/routes';
import { userAtom } from '@/utils/atoms/user';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import CardListWithHeader from '../Employee/CardListWithHeader';
import ListingItem from '../Employee/ListingItem';

const Applications = () => {
  const history = useHistory();
  const [user] = useRecoilState(userAtom);

  const [applications, setApplications] = useState<ApplicationData[]>([]);

  const onClick = () => {
    history.push(routes.employee.base + routes.employee.listings);
  };

  const getApplications = async () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const applications = (await ApplicationService.getApplicationByEmployeeId(user.employee!.id)).data;
    setApplications(applications);
  };

  useEffect(() => {
    getApplications();
  }, []);
  return (
    <CardListWithHeader
      header='Sent Applications'
      description='Stay organized and on top of your job search with our all-in-one application tracking page.'
      buttonText='Find more Jobs'
      buttonOnClick={onClick}
    >
      {applications.map(application => (
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        <ListingItem key={application.id} position={application.job!} application={applications[0]} />
      ))}
    </CardListWithHeader>
  );
};

export default Applications;
