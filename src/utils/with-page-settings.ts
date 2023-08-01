import type { IPageSettings } from '@/types';
import type { GetServerSidePropsContext, GetServerSideProps, Redirect } from 'next';
import type { ParsedUrlQuery } from 'querystring';

const withPageSettings =
  <
    P extends { [key: string]: unknown } = { [key: string]: unknown },
    Q extends ParsedUrlQuery = ParsedUrlQuery,
  >(
    { auth, metaData, layout }: IPageSettings,
    getProps?: GetServerSideProps<P, Q>,
  ) =>
  async (context: GetServerSidePropsContext<Q>) => {
    const internalProps: IPageSettings = { auth };
    // Add property only if it exists
    // since `undefined` value will case SerializableError
    if (metaData) {
      internalProps.metaData = metaData;
    }
    if (layout) {
      internalProps.layout = layout;
    }

    if (!getProps) {
      return {
        props: {
          internal: internalProps,
        },
      };
    }

    // Compute `getProps` method passed from page
    const result: { props?: P | Promise<P>; redirect?: Redirect; notFound?: true } = await getProps(
      context,
    );

    result.props = await result.props;
    if (!result.props) {
      return result;
    }

    // Allow result of `getProps` override internal props passed from `IPageSettings`
    const internalPropsOverride = result.props.internal as IPageSettings | undefined;
    return {
      props: {
        ...result.props,
        internal: {
          ...internalProps,
          ...(internalPropsOverride ?? {}),
        },
      },
    };
  };

export default withPageSettings;
