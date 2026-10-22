import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TextInput,
  Modal
} from 'react-native';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('Dangdut Horeg Karaoke');
  const [nowPlaying, setNowPlaying] = useState('Dangdut Horeg Karaoke HD');
  const [activeModal, setActiveModal] = useState(null); // 'MIC 1', 'MIC 2', etc.

  const [channels, setChannels] = useState([
    { id: 1, name: "MIC 1", sub: "Lead", vol: 0.75, type: "mic", solo: false, mute: false },
    { id: 2, name: "MIC 2", sub: "Duet", vol: 0.70, type: "mic", solo: false, mute: false },
    { id: 3, name: "YT L", sub: "Music L", vol: 0.80, type: "yt", solo: false, mute: false },
    { id: 4, name: "YT R", sub: "Music R", vol: 0.80, type: "yt", solo: false, mute: false },
    { id: 'master', name: "MASTER", sub: "L/R Out", vol: 0.85, type: "master", solo: false, mute: false, isMaster: true }
  ]);

  const toggleState = (id, field) => {
    setChannels(channels.map(ch => ch.id === id ? { ...ch, [field]: !ch[field] } : ch));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#05070a" />

      {/* Top Brand Bar */}
      <View style={styles.topBrand}>
        <Text style={styles.brandTitle}>CANDS TECH LIVE 20 PRO</Text>
        <Text style={styles.topStats}>ANDROID PORTRAIT</Text>
      </View>

      {/* YouTube Screen & Search Area */}
      <View style={styles.touchScreen}>
        <View style={styles.screenHeader}>
          <Text style={styles.screenHeaderText}>▶ YOUTUBE KARAOKE PLAYER</Text>
          <Text style={styles.screenHeaderSub}>STEREO 48kHz</Text>
        </View>
        <View style={styles.ytBox}>
          <Text style={styles.npText}>NOW PLAYING: {nowPlaying}</Text>
        </View>
        <View style={styles.searchRow}>
          <TextInput
            style={styles.input}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Cari lagu karaoke..."
            placeholderTextColor="#64748b"
          />
          <TouchableOpacity style={styles.searchBtn} onPress={() => setNowPlaying(searchQuery + ' (Karaoke HD)')}>
            <Text style={styles.searchBtnText}>CARI</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.resultsScroll}>
          <TouchableOpacity style={styles.resultItem} onPress={() => setNowPlaying('Dangdut Horeg Karaoke HD')}>
            <View>
              <Text style={styles.resTitle}>Dangdut Horeg Karaoke HD</Text>
              <Text style={styles.resSub}>CANDS TECH • 04:15</Text>
            </View>
            <Text style={styles.playText}>PLAY</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resultItem} onPress={() => setNowPlaying('Pop Indonesia Tanpa Vokal')}>
            <View>
              <Text style={styles.resTitle}>Pop Indonesia Tanpa Vokal</Text>
              <Text style={styles.resSub}>Karaoke Studio • 05:02</Text>
            </View>
            <Text style={styles.playText}>PLAY</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Master Meter Bar */}
      <View style={styles.masterMeterBar}>
        <Text style={styles.meterLabel}>MASTER STEREO OUT METERS</Text>
        <View style={styles.ledRow}>
          <View style={[styles.led, styles.ledGreen]} />
          <View style={[styles.led, styles.ledGreen]} />
          <View style={[styles.led, styles.ledYellow]} />
          <View style={[styles.led, styles.ledRed]} />
        </View>
      </View>

      {/* Fader Bank */}
      <View style={styles.faderBank}>
        {channels.map(ch => (
          <View key={ch.id} style={[styles.chStrip, ch.isMaster && styles.masterStrip]}>
            <View style={styles.chScreen}>
              <Text style={styles.chName}>{ch.name}</Text>
              <Text style={styles.chSub}>{ch.sub}</Text>
            </View>

            {!ch.isMaster ? (
              <TouchableOpacity style={styles.btnFx} onPress={() => setActiveModal(ch.name)}>
                <Text style={styles.btnText}>FX</Text>
              </TouchableOpacity>
            ) : <View style={{ height: 20 }} />}

            <TouchableOpacity
              style={[styles.btnAction, ch.solo && styles.soloActive]}
              onPress={() => toggleState(ch.id, 'solo')}
            >
              <Text style={styles.btnActionText}>SOLO</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btnAction, ch.mute && styles.muteActive]}
              onPress={() => toggleState(ch.id, 'mute')}
            >
              <Text style={styles.btnActionText}>MUTE</Text>
            </TouchableOpacity>

            <View style={styles.faderArea}>
              <View style={styles.fTrack}>
                <View style={[styles.fKnob, { bottom: ch.vol * 110 }]} />
              </View>
            </View>
            <Text style={styles.volText}>{Math.round(ch.vol * 100)}%</Text>
          </View>
        ))}
      </View>

      {/* Plugin Modal */}
      {activeModal && (
        <Modal animationType="slide" transparent={true} visible={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>DSP PLUGIN RACK: {activeModal}</Text>
                <TouchableOpacity onPress={() => setActiveModal(null)}>
                  <Text style={styles.closeText}>✕</Text>
                </TouchableOpacity>
              </View>
              <ScrollView style={{ maxHeight: 280 }}>
                <View style={styles.pBox}><Text style={styles.pTitle}>1. HPF & LOW CUT</Text><Text style={styles.pDesc}>Cut: 80 Hz | Slope: 18dB/oct</Text></View>
                <View style={styles.pBox}><Text style={styles.pTitle}>2. NOISE GATE</Text><Text style={styles.pDesc}>Thresh: -42 dB | Release: 150ms</Text></View>
                <View style={styles.pBox}><Text style={styles.pTitle}>3. 4-BAND PARAMETRIC EQ</Text><Text style={styles.pDesc}>Low, Mid, High Boost/Cut Active</Text></View>
                <View style={styles.pBox}><Text style={styles.pTitle}>4. VOCAL COMPRESSOR</Text><Text style={styles.pDesc}>Thresh: -16dB | Ratio: 3:1</Text></View>
                <View style={styles.pBox}><Text style={styles.pTitle}>5. STUDIO REVERB (FX)</Text><Text style={styles.pDesc}>Decay: 2.4s | Mix: 35%</Text></View>
                <View style={styles.pBox}><Text style={styles.pTitle}>6. TAP DELAY (FX)</Text><Text style={styles.pDesc}>Time: 375ms (BPM 120) | FB: 30%</Text></View>
                <View style={styles.pBox}><Text style={styles.pTitle}>7. VOCAL HARMONY ENGINE</Text><Text style={styles.pDesc}>Key: C Major | 3rd & 5th Above</Text></View>
              </ScrollView>
              <TouchableOpacity style={styles.saveBtn} onPress={() => setActiveModal(null)}>
                <Text style={styles.saveBtnText}>SIMPAN & TUTUP</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#05070a', padding: 8 },
  topBrand: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#090b0e', padding: 8, borderRadius: 6, marginBottom: 8 },
  brandTitle: { color: '#ffffff', fontWeight: 'bold', fontSize: 11 },
  topStats: { color: '#38bdf8', fontSize: 8, fontFamily: 'monospace' },
  touchScreen: { backgroundColor: '#040608', borderWidth: 1, borderColor: '#1e293b', borderRadius: 8, padding: 6, height: 210, marginBottom: 8 },
  screenHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  screenHeaderText: { color: '#38bdf8', fontSize: 8, fontWeight: 'bold' },
  screenHeaderSub: { color: '#22c55e', fontSize: 8 },
  ytBox: { backgroundColor: '#000', padding: 6, borderRadius: 4, marginBottom: 4, alignItems: 'center' },
  npText: { color: '#38bdf8', fontSize: 9, fontWeight: 'bold' },
  searchRow: { flexDirection: 'row', gap: 4, marginBottom: 4 },
  input: { flex: 1, backgroundColor: '#121824', color: '#fff', paddingHorizontal: 6, paddingVertical: 3, borderRadius: 4, fontSize: 9 },
  searchBtn: { backgroundColor: '#dc2626', justifyContent: 'center', paddingHorizontal: 8, borderRadius: 4 },
  searchBtnText: { color: '#fff', fontSize: 8, fontWeight: 'bold' },
  resultsScroll: { flex: 1 },
  resultItem: { backgroundColor: '#121824', padding: 5, borderRadius: 4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 },
  resTitle: { color: '#f8fafc', fontSize: 8, fontWeight: 'bold' },
  resSub: { color: '#94a3b8', fontSize: 6 },
  playText: { color: '#16a34a', fontSize: 8, fontWeight: 'bold' },
  masterMeterBar: { backgroundColor: '#0d1016', padding: 6, borderRadius: 6, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  meterLabel: { color: '#cbd5e1', fontSize: 8, fontWeight: 'bold' },
  ledRow: { flexDirection: 'row', gap: 3 },
  led: { width: 6, height: 14, borderRadius: 2 },
  ledGreen: { backgroundColor: '#22c55e' },
  ledYellow: { backgroundColor: '#eab308' },
  ledRed: { backgroundColor: '#ef4444' },
  faderBank: { flex: 1, flexDirection: 'row', gap: 4 },
  chStrip: { flex: 1, backgroundColor: '#131720', borderWidth: 1, borderColor: '#1f2937', borderRadius: 6, padding: 4, alignItems: 'center', justifyContent: 'space-between' },
  masterStrip: { backgroundColor: '#161f30', borderColor: '#38bdf8' },
  chScreen: { backgroundColor: '#05070a', width: '100%', padding: 3, borderRadius: 3, alignItems: 'center' },
  chName: { color: '#fff', fontSize: 8, fontWeight: 'bold' },
  chSub: { color: '#38bdf8', fontSize: 6 },
  btnFx: { width: '100%', backgroundColor: '#0284c7', paddingVertical: 3, borderRadius: 2, alignItems: 'center' },
  btnAction: { width: '100%', backgroundColor: '#1e293b', paddingVertical: 3, borderRadius: 2, alignItems: 'center' },
  soloActive: { backgroundColor: '#eab308' },
  muteActive: { backgroundColor: '#ef4444' },
  btnText: { color: '#fff', fontSize: 7, fontWeight: 'bold' },
  btnActionText: { color: '#94a3b8', fontSize: 7, fontWeight: 'bold' },
  faderArea: { height: 130, width: '100%', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  fTrack: { width: 4, height: 115, backgroundColor: '#05070a', borderRadius: 2, position: 'relative' },
  fKnob: { width: 26, height: 18, backgroundColor: '#64748b', borderRadius: 3, position: 'absolute', left: -11 },
  volText: { color: '#22c55e', fontSize: 7, fontFamily: 'monospace', fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', padding: 16 },
  modalBox: { backgroundColor: '#0f141d', borderRadius: 8, padding: 12, borderWidth: 1, borderColor: '#38bdf8' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#334155', paddingBottom: 6, marginBottom: 8 },
  modalTitle: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  closeText: { color: '#94a3b8', fontSize: 12, fontWeight: 'bold' },
  pBox: { backgroundColor: '#161e2e', padding: 6, borderRadius: 4, marginBottom: 4 },
  pTitle: { color: '#38bdf8', fontSize: 9, fontWeight: 'bold' },
  pDesc: { color: '#94a3b8', fontSize: 7 },
  saveBtn: { backgroundColor: '#2563eb', padding: 6, borderRadius: 4, alignItems: 'center', marginTop: 8 },
  saveBtnText: { color: '#fff', fontSize: 9, fontWeight: 'bold' }
});
