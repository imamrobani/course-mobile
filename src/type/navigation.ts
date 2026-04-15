// Root stack
export type RootStackParamList = {
  Login: undefined;
  MainTab:
    | {
        screen: keyof MainTabParamList;
        params?: MainTabParamList[keyof MainTabParamList];
      }
    | undefined;
  CourseDetail: { id: string };
};

// ======================
// Main Tab Navigation
// ======================
export type MainTabParamList = {
  Home: undefined;
  Profile: undefined;
  Favorite: undefined;
};
