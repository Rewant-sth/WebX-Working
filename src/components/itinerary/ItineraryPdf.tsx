import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { ITravelPackage } from '@/types/IPackages';

// Register font if needed
// Font.register({ family: 'Roboto', src: '/fonts/Roboto-Regular.ttf' });

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottom: '1px solid #E5E7EB',
  },
  logo: {
    width: 100,
    height: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F05E25',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 10,
    borderBottom: '1px solid #E5E7EB',
    paddingBottom: 5,
  },
  itineraryItem: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottom: '1px dashed #E5E7EB',
  },
  day: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F05E25',
    marginBottom: 5,
  },
  activity: {
    fontSize: 12,
    color: '#4B5563',
    lineHeight: 1.5,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#9CA3AF',
    borderTop: '1px solid #E5E7EB',
    paddingTop: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 15,
    objectFit: 'cover',
  },
});

export const ItineraryPdf = ({ data }: { data: ITravelPackage }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{data.name}</Text>
          <Text style={styles.subtitle}>{data.location} • {data.duration} Days</Text>
        </View>
      </View>

      {data.coverImage && (
        <Image
          src={data.coverImage}
          style={styles.image}
        />
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trip Overview</Text>
        <Text style={styles.activity}>
          {data.overview || 'No overview available.'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Detailed Itinerary</Text>
        {data.itinerary?.map((day, index) => (
          <View key={index} style={styles.itineraryItem}>
            <Text style={styles.day}>Day {day.day}: {day.title}</Text>
            <Text style={styles.activity}>
              {day.description}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Text>Thank you for choosing Real Himalaya. For any queries, contact us at +977 985-1026840</Text>
      </View>
    </Page>
  </Document>
);
