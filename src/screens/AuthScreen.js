import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { signup, signin } from "../api/api"; // <-- import functions

export default function AuthScreen({ navigation }) {
  const [mode, setMode] = useState("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const data = await signup(name, email, password);
    if (data) {
      navigation.replace("Main"); // go to main screen only if success
    }
  };

  const handleSignin = async () => {
    const data = await signin(email, password);
    if (data) {
      navigation.replace("Main");
    }
  };

  return (
    <View style={{ flex: 1, padding: 18, backgroundColor: "#ffffffff" }}>
      <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 200 }}>
        <TouchableOpacity onPress={() => setMode("signin")}>
          <Text style={[styles.tab, mode === "signin" && styles.active]}>sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMode("signup")}>
          <Text style={[styles.tab, mode === "signup" && styles.active]}>sign up</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 30 }}>
        {mode === "signin" ? (
          <>
            <TextInput
              placeholder="Email Address"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              placeholder="Enter Password"
              secureTextEntry
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.primaryBtn} onPress={handleSignin}>
              <Text style={{ color: "#fff", fontWeight: "800" }}>Login</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TextInput
              placeholder="Full name"
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
            <TextInput
              placeholder="Email address"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              placeholder="Create password"
              secureTextEntry
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.primaryBtn} onPress={handleSignup}>
              <Text style={{ color: "#fff", fontWeight: "800" }}>create account</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tab: { marginHorizontal: 18, paddingVertical: 6, fontSize: 16, color: "#ff8c00" },
  active: { borderBottomWidth: 2, borderColor: "#ff8c00" },
  input: { borderWidth: 1, borderColor: "#ddd", padding: 10, borderRadius: 8, marginBottom: 12 },
  primaryBtn: { backgroundColor: "#ff8c00", paddingVertical: 12, borderRadius: 12, alignItems: "center" }
});
