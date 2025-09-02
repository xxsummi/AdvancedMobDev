import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function ComponentShowcase() {
  const longText = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut magna urna, convallis a mauris at, scelerisque sodales urna. Cras non mattis tortor. Maecenas dapibus dignissim augue, ut pharetra eros aliquet ut. Sed nec neque ac lorem finibus viverra. Aliquam tempor tellus quis nisl varius tempor vel a mi. Etiam eleifend dapibus massa, vitae aliquet nulla ultricies nec. Aenean bibendum, enim sit amet laoreet finibus, purus nisl eleifend velit, at dapibus nisl massa a enim. Integer rhoncus purus ac dolor vulputate rutrum. Vivamus placerat elementum tortor, eget condimentum nunc. Nullam sollicitudin dui mi, vitae fringilla mi consectetur eu. In vel dictum nibh, vitae interdum mi. Cras pretium magna eu tempor sagittis. Curabitur consequat tristique erat, id scelerisque nibh porta eget. Curabitur nec tellus sed dui imperdiet accumsan ac at ante. Praesent feugiat pulvinar orci, quis commodo neque.

  Mauris mattis velit quis diam posuere cursus. Aliquam blandit nibh vel ornare interdum. Maecenas interdum purus et neque auctor, sed volutpat velit hendrerit. Donec vel cursus nibh. Proin eget arcu erat. Morbi eleifend, neque a consequat mattis, ipsum arcu convallis libero, sed dictum mauris neque iaculis ipsum. Quisque quis mauris condimentum nisi viverra venenatis sed sit amet sapien. Curabitur a accumsan lorem. Curabitur porta libero malesuada odio vehicula, ut ornare ex ullamcorper. Nulla tortor velit, auctor lacinia libero quis, facilisis condimentum tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris porttitor lectus feugiat libero tristique, nec ultrices tortor egestas.

  In ut lectus ut quam semper porttitor. Proin cursus sagittis facilisis. Aenean a elementum nibh, id euismod arcu. Maecenas a vehicula ipsum, et posuere nisi. Integer aliquam odio et risus porta, a volutpat mi tempor. Integer in eleifend massa. Morbi sed diam imperdiet mauris molestie facilisis ut vitae sapien. Cras non sapien sed ligula pellentesque mollis. Ut sagittis mi eu consequat porttitor.

  Aliquam porttitor felis nulla. Praesent egestas luctus rhoncus. Phasellus faucibus, nulla vel dictum dapibus, est purus tincidunt leo, nec eleifend ante ligula sed urna. Maecenas at diam in risus sodales porttitor non id diam. Proin et pulvinar diam, eget ultricies metus. Sed pulvinar elementum nulla vitae hendrerit. Nulla facilisi. Sed tristique ultricies quam, finibus commodo orci consectetur at. Fusce euismod tempor auctor. Vivamus malesuada et justo a euismod. Curabitur imperdiet diam eu justo finibus tempus. Maecenas congue pharetra aliquam. Nulla rhoncus leo feugiat justo facilisis ultricies. Fusce faucibus semper massa sed viverra. Sed tempus erat enim, faucibus tristique magna commodo ac. Phasellus in dolor sit amet lacus porta hendrerit vel sed mi.

  Proin vitae lorem elit. Ut quis metus dapibus, dictum tortor quis, vestibulum libero. Mauris non magna eu velit pretium accumsan. Duis sollicitudin venenatis sapien, et malesuada mauris rhoncus eu. Mauris varius nibh sed dolor sagittis, in sagittis odio accumsan. Curabitur non massa tellus. Morbi nulla diam, malesuada nec mauris at, ornare imperdiet orci. Ut lacinia facilisis neque, in vulputate ligula viverra sit amet. Morbi consectetur nisl ac orci egestas, et luctus elit laoreet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam vestibulum hendrerit nisl sed volutpat. Curabitur erat velit, congue et pharetra non, porta in ante. In in tortor eget nisl sodales aliquam sed et est.

  Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam et viverra odio. Curabitur maximus, nibh at tempor ullamcorper, elit nisi pulvinar dolor, quis fringilla nisi est in purus. Donec posuere elit id laoreet lobortis. Aenean gravida ante maximus metus vulputate, in laoreet mi rutrum. Cras commodo aliquam orci, efficitur pulvinar nisl lobortis ac. Duis volutpat mattis nisl et fermentum. Morbi sit amet convallis libero, quis tempor eros. Mauris in nisl vel tellus dignissim dapibus a sit amet nibh. In id nisi ac dolor egestas consectetur. Integer sit amet pharetra arcu. Donec semper pharetra elit, eget cursus tellus aliquet sed. Nulla lacinia est eget ante posuere ornare. Pellentesque facilisis nulla a sapien porttitor placerat. Duis sed elementum lectus, vel lobortis mi.
  `;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>˚.🎀༘⋆ This is a scrollable box ˚.🎀༘⋆</Text>
      <ScrollView style={styles.scrollBox}>
        <Text style={styles.text}>{longText}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fac5cc", // soft pink
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#e82e44", // darker pink
  },
  scrollBox: {
    width: "100%",
    height: 300,
    padding: 15,
    backgroundColor: "#fcdee2",
    borderWidth: 2,
    borderColor: "#ff7588",
    borderRadius: 15,
  },
  text: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
  },
});
