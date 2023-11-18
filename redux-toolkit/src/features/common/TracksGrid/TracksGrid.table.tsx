import {
  AppGridColumnDefinition,
  AppGridValueGetterProps,
  AppGridTableViewDefinitions,
} from "@benbeck764/react-components-grid/Grid";
import { SpotifyTrack } from "../../../state/queries/models/spotify.models";
import {
  TracksGridAlbumCover,
  TracksGridIndex,
  TracksGridTrackDuration,
  TracksGridTrackTitle,
} from "./TracksGrid.columns";

// const getMobileColumns = (): AppGridColumnDefinition<SpotifyTrack>[] => {
//   return [
//     {
//       title: "",
//       width: "100%",
//       value: (props: AppGridValueGetterProps<SpotifyTrack>) => {
//         return <></>;
//       },
//       loadingPlaceholder: <></>,
//     },
//   ];
// };

// const getLgColumns = (): AppGridColumnDefinition<SpotifyTrack>[] => {
//   return [
//     {
//       title: "Poem",
//       width: "15%",
//       value: (props: AppGridValueGetterProps<SpotifyTrack>) => {
//         return (
//           <ManagePoemsGridImage
//             item={props.item}
//             onItemSelected={onItemSelected}
//           />
//         );
//       },
//       loadingPlaceholder: <ManagePoemsGridImage loadingPlaceholder={true} />,
//     },
//     {
//       title: "",
//       width: "32.5%",
//       value: (props: AppGridValueGetterProps<SpotifyTrack>) => {
//         return (
//           <ManagePoemsGridTitleAndDescription
//             item={props.item}
//             onItemSelected={onItemSelected}
//           />
//         );
//       },
//       loadingPlaceholder: (
//         <ManagePoemsGridTitleAndDescription loadingPlaceholder={true} />
//       ),
//     },
//     {
//       title: "Categories",
//       width: "20%",
//       value: (props: AppGridValueGetterProps<SpotifyTrack>) => {
//         return <ManagePoemsGridCategories item={props.item} />;
//       },
//       loadingPlaceholder: (
//         <ManagePoemsGridCategories loadingPlaceholder={true} />
//       ),
//     },
//     {
//       title: "Details",
//       width: "25%",
//       value: (props: AppGridValueGetterProps<SpotifyTrack>) => {
//         return (
//           <ManagePoemsGridDetails
//             item={props.item}
//             direction="horizontal"
//             date="short"
//           />
//         );
//       },
//       loadingPlaceholder: (
//         <ManagePoemsGridDetails
//           direction="horizontal"
//           date="short"
//           loadingPlaceholder={true}
//         />
//       ),
//     },
//     {
//       title: "",
//       width: "7.5%",
//       value: (props: AppGridValueGetterProps<SpotifyTrack>) => {
//         return (
//           <ManagePoemsGridTools
//             item={props.item}
//             onDeleteSelected={onItemDeleteSelected}
//           />
//         );
//       },
//       loadingPlaceholder: <ManagePoemsGridTools loadingPlaceholder={true} />,
//     },
//   ];
// };

const getXlColumns = (): AppGridColumnDefinition<SpotifyTrack>[] => {
  return [
    {
      title: "",
      width: "3.5%",
      value: (props: AppGridValueGetterProps<SpotifyTrack>) => {
        return <TracksGridIndex item={props.item} index={props.itemIndex} />;
      },
      loadingPlaceholder: <TracksGridIndex loadingPlaceholder={true} />,
    },
    {
      title: "",
      width: "6.5%",
      value: (props: AppGridValueGetterProps<SpotifyTrack>) => {
        return <TracksGridAlbumCover item={props.item} />;
      },
      loadingPlaceholder: <TracksGridAlbumCover loadingPlaceholder={true} />,
    },
    {
      title: "",
      width: "80%",
      value: (props: AppGridValueGetterProps<SpotifyTrack>) => {
        return <TracksGridTrackTitle item={props.item} />;
      },
      loadingPlaceholder: <TracksGridTrackTitle loadingPlaceholder={true} />,
    },
    {
      title: "",
      width: "10%",
      value: (props: AppGridValueGetterProps<SpotifyTrack>) => {
        return <TracksGridTrackDuration item={props.item} />;
      },
      loadingPlaceholder: <TracksGridTrackDuration loadingPlaceholder={true} />,
    },
  ];
};

export const createTableViewDefinitions =
  (): AppGridTableViewDefinitions<SpotifyTrack> => ({
    xs: {
      showHeader: true,
      tableProps: {
        sx: {
          tableLayout: "fixed",
        },
      },
      virtualizedProps: {
        enabled: true,
        useWindowScroll: true,
      },
      //columns: getMobileColumns(),
      columns: getXlColumns(),
    },
    lg: {
      showHeader: true,
      tableProps: {
        sx: {
          tableLayout: "fixed",
        },
      },
      virtualizedProps: {
        enabled: true,
        useWindowScroll: true,
      },
      // columns: getLgColumns(),
      columns: getXlColumns(),
    },
    xl: {
      showHeader: false,
      tableProps: {
        sx: {
          tableLayout: "fixed",
          px: 1,
          backgroundColor: (theme) => theme.palette.coolGrey[900],
        },
      },
      bodyTableRowProps: {
        sx: {
          backgroundColor: (theme) => theme.palette.coolGrey[900],
          borderColor: (theme) => theme.palette.coolGrey[900],
          "&:hover": {
            backgroundColor: (theme) => theme.palette.coolGrey[800],
          },
        },
      },
      tableHeadSx: {
        backgroundColor: (theme) => theme.palette.coolGrey[900],
        borderRadius: (theme) => theme.shape.borderRadius,
      },
      tableHeadContainerSx: {
        backgroundColor: (theme) => theme.palette.coolGrey[900],
        borderRadius: (theme) => theme.shape.borderRadius,
      },
      columns: getXlColumns(),
    },
  });
