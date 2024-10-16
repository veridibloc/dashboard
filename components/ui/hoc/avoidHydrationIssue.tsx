import { useEffect, useState, ComponentType } from 'react';

export function avoidHydrationIssue(WrappedComponent: ComponentType<any>) {
  return function ComponentWithIsMounted(props: any) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return <WrappedComponent {...props} />;
  };
}
